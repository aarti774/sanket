
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { dictionaryItems, DictionaryItem } from "@/data/dictionary";

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<DictionaryItem | null>(null);
  
  const filteredItems = dictionaryItems.filter(item => 
    item.word.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const alphabetItems = filteredItems.filter(item => item.category === "alphabet");
  const numberItems = filteredItems.filter(item => item.category === "number");
  const phraseItems = filteredItems.filter(item => item.category === "common-phrase");
  
  const handleOpenItem = (item: DictionaryItem) => {
    setSelectedItem(item);
  };
  
  const handleCloseItem = () => {
    setSelectedItem(null);
  };
  
  const DictionaryItemCard = ({ item }: { item: DictionaryItem }) => (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => handleOpenItem(item)}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{item.word}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 max-w-6xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Sign Language Dictionary</h1>
      
      <div className="mb-6 relative">
        <Label htmlFor="search" className="sr-only">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            id="search"
            placeholder="Search for signs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="alphabet">Alphabet</TabsTrigger>
          <TabsTrigger value="numbers">Numbers</TabsTrigger>
          <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredItems.map(item => (
                <DictionaryItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No matching signs found</p>
          )}
        </TabsContent>
        
        <TabsContent value="alphabet" className="space-y-6">
          {alphabetItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {alphabetItems.map(item => (
                <DictionaryItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No matching alphabet signs found</p>
          )}
        </TabsContent>
        
        <TabsContent value="numbers" className="space-y-6">
          {numberItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {numberItems.map(item => (
                <DictionaryItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No matching number signs found</p>
          )}
        </TabsContent>
        
        <TabsContent value="phrases" className="space-y-6">
          {phraseItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {phraseItems.map(item => (
                <DictionaryItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No matching phrase signs found</p>
          )}
        </TabsContent>
      </Tabs>
      
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl bg-white rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedItem.word}</h2>
                <Button variant="ghost" onClick={handleCloseItem}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <video
                    className="w-full h-full"
                    controls
                    src={selectedItem.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-gray-600">{selectedItem.description}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dictionary;
