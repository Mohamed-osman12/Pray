const CACHE_NAME = 'muslim-tracker-v1';
const assets = [
  './',
  './index.html',
  // أضف أي ملفات صور أو أيقونات هنا لاحقاً
];

// تثبيت الخدمة وتخزين الملفات للعمل بدون إنترنت
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// استقبال أوامر إرسال التنبيهات
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./') // يفتح التطبيق عند الضغط على التنبيه
  );
});

// وظيفة إرسال التنبيه (يمكن استدعاؤها من ملف الـ HTML)
self.addEventListener('message', event => {
  if (event.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, delay } = event.data;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body: body,
        icon: 'icon.png', // ضع أيقونة لو أردت
        vibrate: [200, 100, 200]
      });
    }, delay);
  }
});
