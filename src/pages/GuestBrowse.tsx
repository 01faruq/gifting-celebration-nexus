
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, ArrowLeft, Package, Check } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

const GuestBrowse = () => {
  const { registryId } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [guestForm, setGuestForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Sample items data based on registry
  const itemsData = {
    "1": [
      { id: "1", name: "Kitchen Blender", description: "For my morning smoothies", quantity: 1, reserved: 0, available: true },
      { id: "2", name: "Bed Sheets Set", description: "White or cream color", quantity: 2, reserved: 1, available: true },
      { id: "3", name: "Rice Cooker", description: "Medium size for family use", quantity: 1, reserved: 1, available: false },
      { id: "4", name: "Reading Books", description: "Any fiction novels", quantity: 3, reserved: 1, available: true },
      { id: "5", name: "Cooking Pot Set", description: "Non-stick preferred", quantity: 1, reserved: 0, available: true },
      { id: "6", name: "Laptop Bag", description: "For my new job", quantity: 1, reserved: 1, available: false }
    ],
    "2": [
      { id: "7", name: "Dinner Plates Set", description: "White ceramic, 8 pieces", quantity: 1, reserved: 0, available: true },
      { id: "8", name: "Wedding Photo Frame", description: "Large size for our portrait", quantity: 2, reserved: 1, available: true },
      { id: "9", name: "Kitchen Knife Set", description: "Professional quality", quantity: 1, reserved: 1, available: false },
      { id: "10", name: "Bedside Lamps", description: "Matching pair", quantity: 2, reserved: 0, available: true }
    ]
  };

  const items = itemsData[registryId as keyof typeof itemsData] || itemsData["1"];

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem && guestForm.name) {
      // Simulate reservation
      navigate(`/guest/${registryId}/thank-you`, { 
        state: { 
          itemName: selectedItem.name,
          guestName: guestForm.name 
        }
      });
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
            <Link to={`/guest/${registryId}`}>
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">
              Choose Your Gift
            </h1>
            <p className="text-body">
              Pick something you'd love to bring. Reserved items are no longer available.
            </p>
          </div>

          {/* Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className={`transition-all duration-300 ${
                item.available ? 'hover:shadow-lg cursor-pointer' : 'opacity-60'
              }`}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Package className={`h-8 w-8 ${item.available ? 'text-primary' : 'text-muted'}`} />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.available 
                          ? 'bg-secondary/20 text-primary' 
                          : 'bg-destructive/20 text-destructive'
                      }`}>
                        {item.available ? 'Available' : 'Reserved'}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-poppins font-semibold text-foreground mb-1">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-body">{item.description}</p>
                      )}
                    </div>

                    <div className="text-xs text-hint">
                      {item.quantity > 1 ? (
                        <span>
                          {item.quantity - item.reserved} of {item.quantity} still available
                        </span>
                      ) : (
                        <span>Single item</span>
                      )}
                    </div>

                    {item.available ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full font-poppins" 
                            onClick={() => setSelectedItem(item)}
                          >
                            I Go Bring This
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reserve {item.name}</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleReserve} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="guestName">Your Name *</Label>
                              <Input
                                id="guestName"
                                placeholder="Enter your full name"
                                value={guestForm.name}
                                onChange={(e) => setGuestForm({...guestForm, name: e.target.value})}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="guestEmail">Email (Optional)</Label>
                              <Input
                                id="guestEmail"
                                type="email"
                                placeholder="your.email@example.com"
                                value={guestForm.email}
                                onChange={(e) => setGuestForm({...guestForm, email: e.target.value})}
                              />
                              <p className="text-xs text-hint">We'll send you a reminder closer to the event</p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="guestMessage">Message to Host (Optional)</Label>
                              <textarea
                                id="guestMessage"
                                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Leave a sweet message..."
                                value={guestForm.message}
                                onChange={(e) => setGuestForm({...guestForm, message: e.target.value})}
                                rows={3}
                              />
                            </div>

                            <Button type="submit" className="w-full font-poppins" disabled={!guestForm.name}>
                              Confirm Reservation
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button disabled className="w-full font-poppins">
                        <Check className="h-4 w-4 mr-2" />
                        Already Reserved
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State for Available Items */}
          {items.filter(item => item.available).length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-16 w-16 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-poppins font-semibold mb-2">All Items Reserved</h3>
                <p className="text-body">
                  Looks like all the gifts have been reserved! The host will be so happy.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default GuestBrowse;
