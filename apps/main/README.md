### Dev Env

```
NEXT_PUBLIC_API_URL=https://newapi-dev.nyx.today/v1
```

### PROD Env

```
NEXT_PUBLIC_API_URL=https://newapi.nyx.today/v1
```

### Service Worker

```javascript
// register service worker
<Script
    id="serviceWorker"
    dangerouslySetInnerHTML={{
      __html: `
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
  `,
    }}
  ></Script>

// remove service worker
<Script
  id="serviceWorker"
  dangerouslySetInnerHTML={{
    __html: `
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const registration of registrations) {
          registration.unregister();
      } 
  });
`,
  }}
></Script>
```