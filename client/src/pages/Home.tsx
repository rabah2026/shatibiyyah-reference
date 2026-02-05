
import { useState, useEffect } from "react";
import { search, fetchRange, fetchMeta } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, BookOpen, Code2, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

interface Bayt {
  id: number;
  number: number;
  text: string;
  chapter: number;
}

export default function Home() {
  const [, navigate] = useLocation();
  const { toggleTheme, theme } = useTheme();

  const [query, setQuery] = useState("");
  const [verses, setVerses] = useState<Bayt[]>([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"all" | "search">("all");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Load initial data
  useEffect(() => {
    loadAll();
    fetchMeta().then(data => setMeta(data.data)).catch(console.error);
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      // Just load first 100 for performance initially, or all if feasible. 
      // The user asked for "fast", loading 1000+ items might be ok client side but let's be safe.
      // Actually, the user wants the full text available. Let's try fetching a large chunk or all.
      // For now, let's fetch first 100 to show it works, or all if the API supports it.
      // CanonicalData.getRange allows fetching all if we define big range.
      const res = await fetchRange(1, 1200); // 1173 lines usually
      if (res.ok) {
        setVerses(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setActiveTab("all");
      loadAll();
      return;
    }

    setLoading(true);
    setActiveTab("search");
    try {
      const res = await search(query);
      if (res.ok) {
        setVerses(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyBayt = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 font-sans`}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-500" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">متن الشاطبية</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Reference Edition {meta?.version}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? "☀️" : "🌙"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("/api/v1/meta", "_blank")}
              className="flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              API
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="ابحث في المتن..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-right text-lg h-12"
              dir="rtl"
            />
            <Button type="submit" size="lg" className="gap-2 bg-amber-600 hover:bg-amber-700 text-white">
              <Search className="w-5 h-5" />
              بحث
            </Button>
          </form>
        </div>

        {/* Verses List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            </div>
          ) : verses.length > 0 ? (
            <>
              <div className="text-sm text-slate-500 mb-4 text-center">
                {activeTab === 'search' ? `تدائج البحث: ${verses.length}` : `عرض ${verses.length} بيت`}
              </div>
              {verses.map((verse) => (
                <Card key={verse.id} className="group hover:shadow-md transition-all duration-200 border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                  <CardContent className="pt-6">
                    <div className="flex flex-row-reverse items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center border border-amber-100 dark:border-amber-800">
                        <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                          {verse.number}
                        </span>
                      </div>

                      <div className="flex-1 text-center">
                        <p className="text-xl md:text-2xl leading-loose font-arabic text-slate-900 dark:text-slate-100 py-2">
                          {verse.text}
                        </p>
                      </div>

                      <div className="flex-shrink-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => copyBayt(verse.text, verse.id)}>
                          {copiedId === verse.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <div className="text-center py-12 text-slate-500">
              لا توجد نتائج
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

