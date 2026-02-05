import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Code2, BookOpen } from "lucide-react";

export default function ApiDocs() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const endpoints = [
    {
      id: "verses-list",
      title: "الحصول على جميع الأبيات",
      method: "GET",
      path: "/api/trpc/shatibiyyah.verses.list",
      description: "استرجع جميع 1173 بيتاً من متن الشاطبية",
      example: "https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.list",
      response: {
        result: {
          data: {
            json: [
              {
                id: 1,
                verseNumber: 1,
                text: "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
                fullText: "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
                chapterId: 1,
                createdAt: "2026-02-04T17:54:47.000Z"
              }
            ]
          }
        }
      }
    },
    {
      id: "verses-by-number",
      title: "الحصول على بيت برقمه",
      method: "GET",
      path: "/api/trpc/shatibiyyah.verses.byNumber?input=1",
      description: "احصل على بيت محدد برقمه (1-1173)",
      example: "https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.byNumber?input={\"json\":1}",
      response: {
        result: {
          data: {
            json: {
              id: 1,
              verseNumber: 1,
              text: "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
              fullText: "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
              chapterId: 1,
              createdAt: "2026-02-04T17:54:47.000Z"
            }
          }
        }
      }
    },
    {
      id: "verses-by-id",
      title: "الحصول على بيت برقم معرّفه",
      method: "GET",
      path: "/api/trpc/shatibiyyah.verses.byId?input=1",
      description: "احصل على بيت برقم معرّفه في قاعدة البيانات",
      example: "https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.byId?input={\"json\":1}",
      response: {
        result: {
          data: {
            json: {
              id: 1,
              verseNumber: 1,
              text: "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
              fullText: "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
              chapterId: 1,
              createdAt: "2026-02-04T17:54:47.000Z"
            }
          }
        }
      }
    },
    {
      id: "verses-search",
      title: "البحث عن أبيات",
      method: "GET",
      path: "/api/trpc/shatibiyyah.verses.search?input=محمد",
      description: "ابحث عن أبيات باستخدام نصوص عربية",
      example: "https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.search?input={\"json\":\"محمد\"}",
      response: {
        result: {
          data: {
            json: [
              {
                id: 2,
                verseNumber: 2,
                text: "وَثَنَّيْتُ صَلَّى اللهُ رَبِّي عَلَى الِرَّضَا ... مُحَمَّدٍ الْمُهْدى إلَى النَّاسِ مُرْسَلَا",
                fullText: "...",
                chapterId: 1,
                createdAt: "2026-02-04T17:54:47.000Z"
              }
            ]
          }
        }
      }
    },
    {
      id: "chapters-list",
      title: "الحصول على جميع الأبواب",
      method: "GET",
      path: "/api/trpc/shatibiyyah.chapters.list",
      description: "استرجع قائمة بجميع الأبواب",
      example: "https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.chapters.list",
      response: {
        result: {
          data: {
            json: [
              {
                id: 1,
                name: "متن الشاطبية",
                description: "حرز الأماني ووجه التهاني في القراءات السبع",
                orderIndex: 0,
                createdAt: "2026-02-04T17:54:47.000Z"
              }
            ]
          }
        }
      }
    },
    {
      id: "chapters-by-id",
      title: "الحصول على باب مع أبياته",
      method: "GET",
      path: "/api/trpc/shatibiyyah.chapters.byId?input=1",
      description: "احصل على باب محدد مع جميع أبياته",
      example: "https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.chapters.byId?input={\"json\":1}",
      response: {
        result: {
          data: {
            json: {
              id: 1,
              name: "متن الشاطبية",
              description: "حرز الأماني ووجه التهاني في القراءات السبع",
              orderIndex: 0,
              createdAt: "2026-02-04T17:54:47.000Z",
              verses: [
                {
                  id: 1,
                  verseNumber: 1,
                  text: "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
                  fullText: "...",
                  chapterId: 1,
                  createdAt: "2026-02-04T17:54:47.000Z"
                }
              ]
            }
          }
        }
      }
    },
    {
      id: "chapters-verses",
      title: "الحصول على أبيات الباب",
      method: "GET",
      path: "/api/trpc/shatibiyyah.chapters.verses?input=1",
      description: "احصل على قائمة أبيات باب محدد",
      example: "https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.chapters.verses?input={\"json\":1}",
      response: {
        result: {
          data: {
            json: [
              {
                id: 1,
                verseNumber: 1,
                text: "بَدَأْتُ بِبِسْمِ اْللهُ فيِ النَّظْمِ أوَّلاَ ...",
                fullText: "...",
                chapterId: 1,
                createdAt: "2026-02-04T17:54:47.000Z"
              }
            ]
          }
        }
      }
    }
  ];

  const codeExamples = {
    javascript: `// استخدام Fetch API
fetch('https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.list')
  .then(res => res.json())
  .then(data => console.log(data));

// البحث
fetch('https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.search?input={"json":"محمد"}')
  .then(res => res.json())
  .then(data => console.log(data));

// بيت محدد
fetch('https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.byNumber?input={"json":1}')
  .then(res => res.json())
  .then(data => console.log(data));`,

    react: `import { trpc } from '@/lib/trpc';

function VersesList() {
  const { data: verses, isLoading } = trpc.shatibiyyah.verses.list.useQuery();

  if (isLoading) return <div>جاري التحميل...</div>;

  return (
    <div>
      {verses?.map((verse) => (
        <div key={verse.id}>{verse.text}</div>
      ))}
    </div>
  );
}`,

    curl: `# الحصول على جميع الأبيات
curl "https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.list"

# البحث عن أبيات
curl "https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.search?input=%7B%5C%22json%5C%22:%5C%22محمد%5C%22%7D"

# الحصول على بيت محدد
curl "https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.byNumber?input=%7B%5C%22json%5C%22:1%7D"`,

    python: `import requests
import json

# الحصول على جميع الأبيات
response = requests.get('https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.list')
verses = response.json()
print(json.dumps(verses, ensure_ascii=False, indent=2))

# البحث
search_response = requests.get(
  'https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.search?input={"json":"محمد"}'
)
results = search_response.json()
print(json.dumps(results, ensure_ascii=False, indent=2))

# بيت محدد
verse_response = requests.get(
  'https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer/api/trpc/shatibiyyah.verses.byNumber?input={"json":1}'
)
verse = verse_response.json()
print(json.dumps(verse, ensure_ascii=False, indent=2))`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-end gap-3">
            <div className="text-right">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">وثائق الـ API</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">API Documentation</p>
            </div>
            <Code2 className="w-8 h-8 text-amber-600 dark:text-amber-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <Card className="mb-8 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-right">مرحباً بك في API متن الشاطبية</CardTitle>
            <CardDescription className="text-right">
              واجهة برمجية قوية وآمنة للوصول إلى 1173 بيتاً من متن الشاطبية
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-right">
              تم بناء هذه الواجهة البرمجية باستخدام تقنية tRPC الحديثة، مما يوفر:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 text-right">
              <li>أمان من الناحية النوعية (Type-Safe)</li>
              <li>استجابات سريعة وفعّالة</li>
              <li>دعم كامل للنصوص العربية</li>
              <li>بحث متقدم عن الأبيات</li>
              <li>توثيق شامل وأمثلة عملية</li>
            </ul>
          </CardContent>
        </Card>

        {/* Base URL */}
        <Card className="mb-8 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-right">عنوان الخادم الأساسي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 text-amber-400 font-mono text-sm overflow-x-auto">
              <div className="flex items-center justify-between">
                <span dir="ltr">https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard("https://3000-is1a50s5pwu2sptx6939c-59b52aa4.sg1.manus.computer", "base-url")}
                >
                  {copiedId === "base-url" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <Card className="mb-8 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-right">نقاط النهاية (Endpoints)</CardTitle>
            <CardDescription className="text-right">
              جميع نقاط النهاية متاحة للوصول العام بدون مصادقة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.id}
                  className="border border-slate-200 dark:border-slate-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 text-right">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {endpoint.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {endpoint.description}
                      </p>
                    </div>
                    <span className="ml-4 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded font-mono text-sm">
                      {endpoint.method}
                    </span>
                  </div>

                  {/* Endpoint Path */}
                  <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-3 mb-3 overflow-x-auto">
                    <div className="flex items-center justify-between">
                      <code className="text-amber-400 font-mono text-sm" dir="ltr">{endpoint.path}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(endpoint.path, `${endpoint.id}-path`)}
                      >
                        {copiedId === `${endpoint.id}-path` ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Example URL */}
                  <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-3 mb-3">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">مثال:</p>
                    <div className="flex items-center justify-between">
                      <code className="text-slate-900 dark:text-slate-100 font-mono text-xs break-all" dir="ltr">
                        {endpoint.example}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(endpoint.example, `${endpoint.id}-example`)}
                      >
                        {copiedId === `${endpoint.id}-example` ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Response Example */}
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">الاستجابة:</p>
                    <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-3 overflow-x-auto">
                      <code className="text-green-400 font-mono text-xs whitespace-pre-wrap break-words" dir="ltr">
                        {JSON.stringify(endpoint.response, null, 2)}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Examples */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-right flex items-center justify-end gap-2">
              <BookOpen className="w-5 h-5" />
              أمثلة الكود
            </CardTitle>
            <CardDescription className="text-right">
              أمثلة عملية لاستخدام الـ API بلغات برمجية مختلفة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>

              {Object.entries(codeExamples).map(([key, code]) => (
                <TabsContent key={key} value={key}>
                  <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 overflow-x-auto">
                    <div className="flex items-start justify-between mb-3">
                      <code className="text-green-400 font-mono text-sm whitespace-pre-wrap break-words">
                        {code}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(code, `code-${key}`)}
                      >
                        {copiedId === `code-${key}` ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
