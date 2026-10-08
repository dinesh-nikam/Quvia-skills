# Performance Cheatsheet

> A practical reference for optimizing performance across languages, frameworks, and systems.

---

## Table of Contents

1. [General Principles](#general-principles)
2. [Frontend Performance](#frontend-performance)
3. [Backend Performance](#backend-performance)
4. [Database Performance](#database-performance)
5. [Caching Strategies](#caching-strategies)
6. [Network Optimization](#network-optimization)
7. [Language-Specific](#language-specific-tips)
8. [Monitoring & Metrics](#monitoring--metrics)
9. [Quick Wins](#quick-wins)

---

## General Principles

### Measure Before You Optimize
- Always profile first (`perf`, `htop`, Chrome DevTools)
- Focus on the 90th percentile, not the average
- Set a performance budget (e.g., "TTP < 100ms for API calls")

### The 80/20 Rule (Pareto)
- 80% of performance issues come from 20% of the code
- Optimize the hot path first — the code that runs most often
- Use flame graphs to identify bottlenecks visually

### Latency vs Throughput
- **Latency** = time for one request to complete
- **Throughput** = requests per second
- Improving latency often improves throughput, but not always

### Common Performance Killers
| Issue | Impact | Solution |
|---|---|---|
| N+1 queries | O(n) DB round-trips | Use joins, batch loading, DataLoader |
| Blocking I/O | Thread starvation | Use async/non-blocking I/O |
| Unbounded loops | O(n²) or worse | Paginate, stream, limit |
| Memory leaks | OOM crashes | Profile memory, check for dangling refs |
| Sync network calls | High latency | Use connection pooling |
| Unindexed DB queries | Slow lookups | Add indexes on WHERE/GROUP BY/ORDER BY |

---

## Frontend Performance

### Core Web Vitals Targets
| Metric | Good | Needs Improvement | Poor |
|---|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5s–4.0s | > 4.0s |
| FID (First Input Delay) | < 100ms | 100ms–300ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1–0.25 | > 0.25 |

### Bundle Optimization
```bash
# Analyze bundle size
npx webpack-bundle-analyzer dist/stats.json
npx vite-bundle-visualizer
npx next-bundle-analyzer  # For Next.js
```

**Optimization techniques:**
- Code-splitting: `import()` for lazy-loaded modules
- Tree shaking: use ES modules, remove unused exports
- Minification: Terser, esbuild, swc
- Compression: gzip (70% reduction), Brotli (15–20% better)

### Image Optimization
| Format | Best For |
|---|---|
| WebP | Photographs (30% smaller than JPEG) |
| AVIF | Modern browsers (50% smaller than JPEG) |
| SVG | Icons, illustrations (vector, no compression) |
| PNG | Lossless transparency |
| JPEG | Photos (use progressive) |

```html
<!-- Responsive images -->
<img srcset="img-480w.jpg 480w, img-800w.jpg 800w"
     sizes="(max-width: 600px) 480px, 800px"
     src="img-800w.jpg" alt="...">
```

### CSS & Font Optimization
```css
/* Critical CSS inline, rest async */
/* Preload key fonts */
font-display: swap; /* Avoid FOIT */
```

---

## Backend Performance

### HTTP Server Optimization
| Pattern | Use Case |
|---|---|
| Keep-alive | Reuse TCP connections |
| HTTP/2 | Multiplexing, header compression |
| Gzip/Brotli | Response compression |
| CDN | Static asset delivery |
| Reverse proxy | Nginx, Caddy, Envoy |

### Async Patterns
```javascript
// Node.js: Batch async operations
const results = await Promise.all(
  items.map(async (item) => process(item))
);

// Rate limiting
const pMap = require('p-map');
await pMap(items, process, { concurrency: 10 });
```

```python
# Python: Concurrent futures
from concurrent.futures import ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(process, items))
```

### Compression
- **gzip**: 60–80% reduction (fast, widely supported)
- **Brotli**: 70–90% reduction (slower, better)
- **Zstandard**: Fast decompression, good ratio

### Request Profiling
```bash
# Benchmark endpoints
wrk -t12 -c400 -d30s http://localhost:3000/api
ab -n 10000 -c 100 http://localhost:3000/api
siege -c 100 -t 30s http://localhost:3000/api
```

---

## Database Performance

### Index Strategies
| Index Type | Best For |
|---|---|
| B-tree | Equality, range, sorting (`ORDER BY`) |
| Hash | Exact match only (PostgreSQL) |
| GiST | Geospatial, full-text search |
| GIN | JSON/Array containment |
| BRIN | Very large, append-only tables |

**Rule of thumb:** Index columns used in `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY`

### Query Optimization
```sql
-- Use EXPLAIN ANALYZE to see query plan
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM users WHERE created_at > '2024-01-01';

-- Avoid SELECT * on large tables
-- Use covering indexes for read-heavy queries
-- Limit results with LIMIT/pagination
```

### Caching at the Database Layer
```sql
-- Add cache to frequently-run queries
-- Use materialized views for complex aggregations
CREATE MATERIALIZED VIEW daily_stats AS
  SELECT date, COUNT(*) FROM events GROUP BY date;

-- Refresh periodically
REFRESH MATERIALIZED VIEW daily_stats;
```

### N+1 Query Problem
```python
# Bad: N+1 queries
users = User.all()
for user in users:
    print(user.posts.count())  # Hits DB each time

# Good: Single query with prefetch
users = User.all().prefetch_related('posts')
```

---

## Caching Strategies

### Cache Layers (L1 → L4)
| Layer | Latency | Capacity | Use Case |
|---|---|---|---|
| CPU L1 Cache | ~1ns | 32KB | Variables, hot paths |
| Memory (RAM) | ~100ns | GBs | In-process caches |
| Redis/Memcached | ~0.1ms | TBs | Shared cache |
| CDN | ~10ms | ∞ | Static assets, edge |

### Cache Patterns
| Pattern | Description | When to Use |
|---|---|---|
| Cache-Aside | App checks cache, then DB on miss | Read-heavy workloads |
| Write-Through | Write to cache AND DB simultaneously | Strong consistency |
| Write-Behind | Write to cache, async DB flush | High write throughput |
| Read-Through | Cache auto-fetches on miss | Simplified app code |

### Cache Invalidation
```javascript
// TTL-based (time to live)
await redis.setex('user:123', 300, JSON.stringify(data));

// Event-based invalidation
await redis.del('user:123'); // On update

// Write-through
const data = { ... };
await redis.set(`user:${id}`, JSON.stringify(data));
await db.update('users', data);
```

---

## Network Optimization

### DNS Optimization
- Use a fast DNS provider (Cloudflare, Google)
- Preconnect to critical domains: `<link rel="preconnect">`
- Minimize DNS lookups (reduce unique domains)

### CDN Best Practices
| Setting | Recommendation |
|---|---|
| TTL | 1yr for hashed assets, 0 for HTML |
| Edge locations | Global distribution |
| Compression | Enable at CDN edge |
| Caching rules | Cache static, bypass dynamic |

### Connection Optimization
```nginx
# Nginx
keepalive_timeout 65;
keepalive_requests 100;
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### API Performance
| Tactic | Benefit |
|---|---|
| Pagination | Reduces payload size |
| Field selection | `GET /users?fields=name,email` |
| HTTP caching | `ETag`, `Cache-Control` |
| Response compression | 60–90% smaller payloads |
| GraphQL persisted queries | Smaller requests |

---

## Language-Specific Tips

### JavaScript / Node.js
- Use `v8 --prof` for CPU profiling
- Avoid synchronous functions (`fs.readFileSync`)
- Use `Stream` API for large data
- Leverage `worker_threads` for CPU-bound tasks
- Use `lru-cache` for in-memory caching

```javascript
// Use structuredClone() instead of JSON.parse(JSON.stringify())
const copy = structuredClone(obj);
```

### Python
- Use PyPy for CPU-bound work (JIT compiler)
- Profile with `cProfile` and `py-spy`
- Use `ujson` instead of `json` for serialization
- Apply `@functools.lru_cache` for pure functions
- Use `asyncio` for I/O-bound tasks

```python
# Use __slots__ to reduce memory per object
class User:
    __slots__ = ['name', 'email']
```

### Go
- Use goroutine pools for controlled concurrency
- Profile with `pprof`: `go tool pprof cpu.prof`
- Use `sync.Pool` for object reuse
- Avoid interface boxing for hot paths
- Use `strings.Builder` for string concatenation

### Rust
- Use `cargo bench` for benchmarking
- Profile with `perf` / `flamegraph`
- Use `Arc<Mutex<>>` sparingly — consider `crossbeam` channels
- Leverage zero-cost iterators
- Use `serde` with `#[serde(borrow)]` for zero-copy deserialization

### Java
- Use `G1GC` for low-latency apps (`-XX:+UseG1GC`)
- Tune heap: `-Xms4g -Xmx4g` (equal min/max)
- Profile with JFR (Java Flight Recorder)
- Use `StringBuilder` for string concatenation in loops
- Apply `@Immutable` for thread-safe objects

---

## Monitoring & Metrics

### Key Metrics to Track
| Metric | Description | Target |
|---|---|---|
| P95/P99 Latency | Tail latency | < 2x median |
| Error Rate | % of failed requests | < 1% |
| Throughput | Requests/sec | Baseline |
| CPU Usage | Per-core saturation | < 70% avg |
| Memory Usage | Heap growth | Stable |
| GC Pause Time | Stop-the-world pauses | < 10ms |

### Alerting Thresholds (RED Method)
| Signal | Warning | Critical |
|---|---|---|
| Rate | 50% drop | 80% drop |
| Errors | > 1% | > 5% |
| Duration | > 95th percentile | > 99th percentile |

### Profiling Tools
| Tool | Best For |
|---|---|
| `htop` / `top` | System overview |
| `perf` (Linux) | CPU profiling |
| `dtrace` / `DTrace` | System-wide tracing |
| `py-spy` (Python) | Sampling profiler |
| `cargo-flamegraph` (Rust) | Flame graphs |
| `jvisualvm` (Java) | JVM profiling |
| Chrome DevTools | Frontend profiling |

---

## Quick Wins

### 5-Minute Wins
1. **Enable compression** (gzip/brotli) — 60–90% payload reduction
2. **Add caching headers** — `Cache-Control: public, max-age=31536000` for static assets
3. **Optimize images** — compress to WebP/AVIF, use `srcset`
4. **Minify CSS/JS** — remove whitespace, comments
5. **Lazy load images** — `loading="lazy"` on `<img>` tags

### 15-Minute Wins
1. **Add a CDN** — move static assets to edge
2. **Database indexes** — add indexes on slow queries (check `EXPLAIN`)
3. **Connection pooling** — reuse DB/HTTP connections
4. **Preload critical resources** — `<link rel="preload">` for fonts/scripts
5. **Enable HTTP/2** — multiplexing reduces latency

### 1-Hour Wins
1. **Code splitting** — split bundles by route/component
2. **Response caching** — cache API responses (Redis/CDN)
3. **Bundle analysis** — remove unused dependencies
4. **Font optimization** — use `font-display: swap`, subset fonts
5. **Service worker** — cache-first strategy for static assets

### 1-Day Wins
1. **Database query optimization** — eliminate N+1, add covering indexes
2. **Implement SSR/SSG** — pre-render for better TTFB
3. **Image CDN** — auto-formatting, resizing, optimization
4. **Async processing** — move slow operations to queues
5. **Architecture review** — identify and refactor bottlenecks

---

## Performance Budget Template

| Metric | Budget | Tooling |
|---|---|---|
| LCP | < 2.5s | Lighthouse, WebPageTest |
| TBT (Total Blocking Time) | < 200ms | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| JS Bundle Size | < 200 KB gzipped | webpack-bundle-analyzer |
| API Response (P95) | < 200ms | Prometheus, Grafana |
| Database Query (P95) | < 50ms | pg_stat_statements, New Relic |
| Cache Hit Rate | > 90% | Redis INFO, Memcached stats |

---

> **Remember:** Premature optimization is the root of all evil. Profile first, optimize second, measure results third.
