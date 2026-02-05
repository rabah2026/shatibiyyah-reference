# متن الشاطبية - وثائق API

## نظرة عامة

تطبيق ويب متكامل يوفر واجهة برمجية (API) للوصول إلى متن الشاطبية "حرز الأماني ووجه التهاني في القراءات السبع". يحتوي التطبيق على 1173 بيتاً من الشاطبية مع دعم كامل للنصوص العربية والبحث.

## المميزات الرئيسية

- **استخراج شامل**: 1173 بيتاً من متن الشاطبية الأصلي
- **قاعدة بيانات محسّنة**: تخزين فعّال مع دعم البحث السريع
- **API حديثة**: واجهة برمجية قوية باستخدام tRPC
- **واجهة مستخدم أنيقة**: تصميم عصري مع دعم كامل للعربية
- **البحث العربي**: إمكانية البحث عن الأبيات باستخدام النصوص العربية

## نقاط نهاية API

### الأبيات (Verses)

#### الحصول على جميع الأبيات
```
الطريقة: GET
المسار: /api/trpc/shatibiyyah.verses.list
الاستجابة: Array<Verse>
```

**مثال الاستجابة:**
```json
[
  {
    "id": 1,
    "verseNumber": 1,
    "text": "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ... تَبَارَكَ رَحْمَاناً رَحِيماً وَمَوْئِلَا",
    "fullText": "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ... تَبَارَكَ رَحْمَاناً رَحِيماً وَمَوْئِلَا",
    "chapterId": 1,
    "createdAt": "2026-02-04T12:56:00.000Z"
  },
  ...
]
```

#### الحصول على بيت برقمه
```
الطريقة: GET
المسار: /api/trpc/shatibiyyah.verses.byNumber?input=<verse_number>
المعاملات: 
  - verse_number (number): رقم البيت (1-1173)
الاستجابة: Verse | undefined
```

**مثال:**
```
GET /api/trpc/shatibiyyah.verses.byNumber?input=1
```

**مثال الاستجابة:**
```json
{
  "id": 1,
  "verseNumber": 1,
  "text": "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
  "fullText": "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
  "chapterId": 1,
  "createdAt": "2026-02-04T12:56:00.000Z"
}
```

#### الحصول على بيت برقم معرّفه
```
الطريقة: GET
المسار: /api/trpc/shatibiyyah.verses.byId?input=<verse_id>
المعاملات:
  - verse_id (number): معرّف البيت في قاعدة البيانات
الاستجابة: Verse | undefined
```

#### البحث في الأبيات
```
الطريقة: GET
المسار: /api/trpc/shatibiyyah.verses.search?input=<query>
المعاملات:
  - query (string): نص البحث (يدعم النصوص العربية)
الاستجابة: Array<Verse>
```

**أمثلة:**
```
GET /api/trpc/shatibiyyah.verses.search?input=اللهِ
GET /api/trpc/shatibiyyah.verses.search?input=محمد
GET /api/trpc/shatibiyyah.verses.search?input=القراءات
```

**مثال الاستجابة:**
```json
[
  {
    "id": 1,
    "verseNumber": 1,
    "text": "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
    "fullText": "...",
    "chapterId": 1,
    "createdAt": "2026-02-04T12:56:00.000Z"
  },
  ...
]
```

### الأبواب (Chapters)

#### الحصول على جميع الأبواب
```
الطريقة: GET
المسار: /api/trpc/shatibiyyah.chapters.list
الاستجابة: Array<Chapter>
```

**مثال الاستجابة:**
```json
[
  {
    "id": 1,
    "name": "متن الشاطبية",
    "description": "حرز الأماني ووجه التهاني في القراءات السبع",
    "orderIndex": 0,
    "createdAt": "2026-02-04T12:56:00.000Z"
  }
]
```

#### الحصول على باب برقمه مع أبياته
```
الطريقة: GET
المسار: /api/trpc/shatibiyyah.chapters.byId?input=<chapter_id>
المعاملات:
  - chapter_id (number): معرّف الباب
الاستجابة: Chapter & { verses: Array<Verse> } | null
```

**مثال الاستجابة:**
```json
{
  "id": 1,
  "name": "متن الشاطبية",
  "description": "حرز الأماني ووجه التهاني في القراءات السبع",
  "orderIndex": 0,
  "createdAt": "2026-02-04T12:56:00.000Z",
  "verses": [
    {
      "id": 1,
      "verseNumber": 1,
      "text": "...",
      "fullText": "...",
      "chapterId": 1,
      "createdAt": "2026-02-04T12:56:00.000Z"
    },
    ...
  ]
}
```

#### الحصول على أبيات الباب
```
الطريقة: GET
المسار: /api/trpc/shatibiyyah.chapters.verses?input=<chapter_id>
المعاملات:
  - chapter_id (number): معرّف الباب
الاستجابة: Array<Verse>
```

## أنواع البيانات

### Verse
```typescript
{
  id: number;                    // معرّف البيت الفريد
  verseNumber: number;           // رقم البيت (1-1173)
  text: string;                  // نص البيت
  fullText: string | null;       // النص الكامل للبيت
  chapterId: number;             // معرّف الباب
  createdAt: Date;               // تاريخ الإنشاء
}
```

### Chapter
```typescript
{
  id: number;                    // معرّف الباب الفريد
  name: string;                  // اسم الباب
  description: string | null;    // وصف الباب
  orderIndex: number;            // ترتيب الباب
  createdAt: Date;               // تاريخ الإنشاء
}
```

## أمثلة الاستخدام

### استخدام JavaScript/TypeScript (مع tRPC)

```typescript
import { trpc } from '@/lib/trpc';

// الحصول على جميع الأبيات
const verses = await trpc.shatibiyyah.verses.list.query();

// الحصول على بيت برقمه
const verse = await trpc.shatibiyyah.verses.byNumber.query(1);

// البحث عن أبيات
const searchResults = await trpc.shatibiyyah.verses.search.query("اللهِ");

// الحصول على الأبواب
const chapters = await trpc.shatibiyyah.chapters.list.query();

// الحصول على باب مع أبياته
const chapter = await trpc.shatibiyyah.chapters.byId.query(1);
```

### استخدام React Hooks

```typescript
import { trpc } from '@/lib/trpc';

function VersesList() {
  // الحصول على جميع الأبيات
  const { data: verses, isLoading } = trpc.shatibiyyah.verses.list.useQuery();

  // البحث عن أبيات
  const { data: searchResults } = trpc.shatibiyyah.verses.search.useQuery(
    "محمد",
    { enabled: true }
  );

  if (isLoading) return <div>جاري التحميل...</div>;

  return (
    <div>
      {verses?.map((verse) => (
        <div key={verse.id}>
          <p>{verse.text}</p>
        </div>
      ))}
    </div>
  );
}
```

### استخدام Fetch API

```javascript
// الحصول على جميع الأبيات
fetch('/api/trpc/shatibiyyah.verses.list')
  .then(res => res.json())
  .then(data => console.log(data));

// البحث عن أبيات
fetch('/api/trpc/shatibiyyah.verses.search?input=اللهِ')
  .then(res => res.json())
  .then(data => console.log(data));
```

## معالجة الأخطاء

جميع نقاط النهاية تُرجع استجابات JSON. في حالة الخطأ، ستتلقى رسالة خطأ مع رمز الحالة المناسب:

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "معرّف غير صحيح"
  }
}
```

## ملاحظات مهمة

1. **دعم العربية**: جميع نقاط النهاية تدعم النصوص العربية بشكل كامل
2. **الترتيب**: الأبيات مرتبة حسب رقمها في المتن الأصلي
3. **البحث**: يتم البحث بحساسية الحالة ويدعم النصوص العربية
4. **الأداء**: قاعدة البيانات محسّنة للبحث السريع

## الاختبارات

تم اختبار جميع نقاط النهاية باستخدام vitest:

```bash
pnpm test
```

النتائج:
- ✓ 23 اختبار ناجح
- ✓ جميع نقاط النهاية تعمل بشكل صحيح
- ✓ البيانات العربية معالجة بشكل صحيح
- ✓ البحث يعمل بكفاءة

## الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الحر.

## الدعم والتطوير

للمزيد من المعلومات أو الإبلاغ عن مشاكل، يرجى التواصل عبر المشروع.
