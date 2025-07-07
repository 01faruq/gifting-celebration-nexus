
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, ArrowLeft, Package, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useRegistry } from "@/hooks/useRegistries";
import { useToast } from "@/hooks/use-toast";

const GuestBrowse = () => {
  const { registryId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isReserving, setIsReserving] = useState(false);
  const [guestForm, setGuestForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const { registry, loading, error, reserveItem } = useRegistry(registryId || "");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gift className="h-8 w-8 text-primary" />
                <span className="text-2xl font-poppins font-bold text-foreground">Gifty</span>
              </div>
              <Button variant="outline" size="sm" disabled>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Skeleton className="h-8 w-64 mx-auto mb-2" />
              <Skeleton className="h-4 w-96 mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !registry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <Gift className="h-16 w-16 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Registry Not Found</h3>
            <p className="text-body mb-4">This registry doesn't exist or is no longer active.</p>
            <Link to="/">
              <Button>Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const items = registry.items || [];

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !guestForm.name || isReserving) return;

    try {
      setIsReserving(true);
      await reserveItem(selectedItem.id, {
        guest_name: guestForm.name,
        guest_email: guestForm.email || undefined,
        quantity_reserved: 1,
        message: guestForm.message || undefined
      });

      toast({
        title: "Gift Reserved! 🎉",
        description: `You've successfully reserved ${selectedItem.name}`,
      });

      navigate(`/guest/${registryId}/thank-you`, { 
        state: { 
          itemName: selectedItem.name,
          guestName: guestForm.name 
        }
      });
    } catch (error: any) {
      toast({
        title: "Reservation Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsReserving(false);
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
            {items.map((item) => {
              const totalReserved = item.reservations?.reduce((sum: number, reservation: any) => sum + (reservation.quantity_reserved || 0), 0) || 0;
              const remainingQuantity = (item.quantity || 1) - totalReserved;
              const isAvailable = remainingQuantity > 0;
              
              return (
                <Card key={item.id} className={`transition-all duration-300 ${
                  isAvailable ? 'hover:shadow-lg cursor-pointer' : 'opacity-60'
                }`}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <Package className={`h-8 w-8 ${isAvailable ? 'text-primary' : 'text-muted'}`} />
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isAvailable 
                            ? 'bg-secondary/20 text-primary' 
                            : 'bg-destructive/20 text-destructive'
                        }`}>
                          {isAvailable ? `${remainingQuantity} Available` : 'Fully Reserved'}
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
                        {(item.quantity || 1) > 1 ? (
                          <span>
                            {remainingQuantity} of {item.quantity || 1} still available
                          </span>
                        ) : (
                          <span>Single item</span>
                        )}
                      </div>

                      {isAvailable ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full font-poppins" 
                              onClick={() => setSelectedItem(item)}
                            >
                              Reserve This Gift
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
                                  disabled={isReserving}
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
                                  disabled={isReserving}
                                />
                                <p className="text-xs text-hint">We'll send you a reminder closer to the event</p>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="guestMessage">Message to Host (Optional)</Label>
                                <textarea
                                  id="guestMessage"
                                  className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="Leave a sweet message..."
                                  value={guestForm.message}
                                  onChange={(e) => setGuestForm({...guestForm, message: e.target.value})}
                                  rows={3}
                                  disabled={isReserving}
                                />
                              </div>

                              <Button 
                                type="submit" 
                                className="w-full font-poppins" 
                                disabled={!guestForm.name || isReserving}
                              >
                                {isReserving ? "Reserving..." : "Confirm Reservation"}
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button disabled className="w-full font-poppins">
                          <Check className="h-4 w-4 mr-2" />
                          Fully Reserved
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {items.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-16 w-16 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-poppins font-semibold mb-2">No Items Yet</h3>
                <p className="text-body">
                  The host hasn't added any items to their registry yet. Check back soon!
                </p>
              </CardContent>
            </Card>
          ) : items.filter(item => {
            const totalReserved = item.reservations?.reduce((sum: number, reservation: any) => sum + (reservation.quantity_reserved || 0), 0) || 0;
            return (item.quantity || 1) - totalReserved > 0;
          }).length === 0 && (
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
