
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Calendar, Users, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "react-router-dom";
import { useRegistry } from "@/hooks/useRegistries";

const GuestLanding = () => {
  const { registryId } = useParams();
  const { registry, loading, error } = useRegistry(registryId || "");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <Gift className="h-8 w-8 text-primary" />
                <span className="text-2xl font-poppins font-bold text-foreground">Gifty</span>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
              <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
              <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
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

  // Calculate progress
  const totalItems = registry.items?.length || 0;
  const reservedCount = registry.items?.reduce((count: number, item: any) => {
    const totalReserved = item.reservations?.reduce((sum: number, reservation: any) => sum + (reservation.quantity_reserved || 0), 0) || 0;
    return count + Math.min(totalReserved, item.quantity || 1);
  }, 0) || 0;
  const progress = totalItems > 0 ? Math.round((reservedCount / totalItems) * 100) : 0;

  // Create initials for avatar
  const getInitials = (title: string) => {
    return title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Gift className="h-8 w-8 text-primary" />
              <span className="text-2xl font-poppins font-bold text-foreground">Gifty</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Host Avatar & Welcome */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {getInitials(registry.title)}
            </div>
            <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">
              {registry.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-body mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(registry.event_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{registry.event_type}</span>
              </div>
            </div>
          </div>

          {/* Host Message */}
          {registry.message && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Heart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-poppins font-semibold text-foreground mb-2">
                      Message from the host:
                    </h3>
                    <p className="text-body leading-relaxed">
                      {registry.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="font-poppins font-semibold text-foreground">
                  Registry Progress
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-hint">Gifts Reserved</span>
                    <span className="text-sm font-medium text-primary">
                      {reservedCount} of {totalItems} items
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4">
                    <div 
                      className="bg-primary h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2" 
                      style={{width: `${progress}%`}}
                    >
                      <span className="text-xs text-white font-medium">
                        {progress}%
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-body">
                  {totalItems - reservedCount} gifts still available to reserve
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-poppins font-semibold text-foreground mb-4">
                Ready to Pick a Gift? 🎁
              </h2>
              <p className="text-body mb-6">
                Browse the available items and reserve something you'd love to bring
              </p>
            </div>

            <Link to={`/guest/${registryId}/browse`}>
              <Button size="lg" className="font-poppins px-8 py-3 text-lg">
                Browse Available Gifts
              </Button>
            </Link>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4">
                <Gift className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium text-foreground">Choose Your Gift</h4>
                <p className="text-sm text-body">Pick from available items</p>
              </div>
              <div className="text-center p-4">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium text-foreground">Reserve It</h4>
                <p className="text-sm text-body">No duplicates, no stress</p>
              </div>
              <div className="text-center p-4">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium text-foreground">Make Them Happy</h4>
                <p className="text-sm text-body">Give exactly what they want</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuestLanding;
