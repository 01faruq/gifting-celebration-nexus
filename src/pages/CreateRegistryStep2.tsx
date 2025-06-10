
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, ArrowLeft, Plus, Trash2, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Item {
  id: string;
  name: string;
  description: string;
  quantity: number;
}

const CreateRegistryStep2 = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState({
    name: "",
    description: "",
    quantity: 1
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Pre-populate with sample items for demo
    const sampleItems: Item[] = [
      {
        id: "1",
        name: "Kitchen Blender",
        description: "For my morning smoothies",
        quantity: 1
      },
      {
        id: "2", 
        name: "Bed Sheets Set",
        description: "White or cream color preferred",
        quantity: 2
      },
      {
        id: "3",
        name: "Rice Cooker",
        description: "Medium size for family use",
        quantity: 1
      }
    ];
    setItems(sampleItems);
  }, []);

  const addItem = () => {
    if (currentItem.name) {
      const newItem: Item = {
        id: Date.now().toString(),
        ...currentItem
      };
      setItems([...items, newItem]);
      setCurrentItem({ name: "", description: "", quantity: 1 });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    if (items.length > 0) {
      localStorage.setItem("registry-step2", JSON.stringify(items));
      navigate("/create-registry/step3");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gift className="h-8 w-8 text-primary" />
              <span className="text-2xl font-poppins font-bold text-foreground">Gifty</span>
            </div>
            <Link to="/create-registry/step1">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">✓</div>
                <span className="ml-2 text-sm font-medium text-primary">Event Details</span>
              </div>
              <div className="w-12 h-px bg-primary"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <span className="ml-2 text-sm font-medium text-primary">Add Items</span>
              </div>
              <div className="w-12 h-px bg-muted"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-muted text-hint rounded-full flex items-center justify-center text-sm">3</div>
                <span className="ml-2 text-sm text-hint">Review & Share</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add New Item */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 text-primary mr-2" />
                  Add Something You'd Love
                </CardTitle>
                <p className="text-body">Tell your guests what would make you happy</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name *</Label>
                  <Input
                    id="itemName"
                    placeholder="e.g., Kitchen Blender"
                    value={currentItem.name}
                    onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itemDescription">Description (Optional)</Label>
                  <textarea
                    id="itemDescription"
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Any specific preferences or details..."
                    value={currentItem.description}
                    onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">How Many?</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem({...currentItem, quantity: parseInt(e.target.value) || 1})}
                  />
                </div>

                <Button onClick={addItem} className="w-full font-poppins" disabled={!currentItem.name}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add This Item
                </Button>
              </CardContent>
            </Card>

            {/* Items List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 text-primary mr-2" />
                  Your Wish List ({items.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <p className="text-center text-hint py-8">No items added yet. Add your first item!</p>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          {item.description && (
                            <p className="text-sm text-body mt-1">{item.description}</p>
                          )}
                          <p className="text-xs text-hint mt-1">Quantity: {item.quantity}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button 
              onClick={handleSubmit} 
              className="font-poppins px-8" 
              size="lg"
              disabled={items.length === 0}
            >
              Next: Review & Share
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateRegistryStep2;
