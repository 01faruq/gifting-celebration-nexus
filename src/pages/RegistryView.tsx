
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, ArrowLeft, Share, Copy, Check, Calendar, Users, Package } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useRegistry } from "@/hooks/useRegistries";

const RegistryView = () => {
  const { registryId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const { registry, loading, error } = useRegistry(registryId || "");

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
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-32 w-full" />
            <div className="grid lg:grid-cols-3 gap-8">
              <Skeleton className="h-64" />
              <div className="lg:col-span-2">
                <Skeleton className="h-96" />
              </div>
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
            <p className="text-body mb-4">This registry doesn't exist or you don't have access to it.</p>
            <Link to="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const copyShareLink = async () => {
    const shareLink = `${window.location.origin}/guest/${registryId}`;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const shareRegistry = () => {
    const shareLink = `${window.location.origin}/guest/${registryId}`;
    if (navigator.share) {
      navigator.share({
        title: registry.title,
        text: 'Check out my gift registry!',
        url: shareLink
      });
    } else {
      copyShareLink();
    }
  };

  // Calculate progress based on reservations
  const totalItems = registry.items?.length || 0;
  const reservedCount = registry.items?.reduce((count: number, item: any) => {
    const totalReserved = item.reservations?.reduce((sum: number, reservation: any) => sum + (reservation.quantity_reserved || 0), 0) || 0;
    return count + Math.min(totalReserved, item.quantity || 1);
  }, 0) || 0;
  const progress = totalItems > 0 ? Math.round((reservedCount / totalItems) * 100) : 0;

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
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Registry Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-poppins font-bold text-foreground">{registry.title}</h1>
                 <div className="flex items-center space-x-4 text-body mt-2">
                   <div className="flex items-center space-x-1">
                     <Calendar className="h-4 w-4" />
                     <span>{new Date(registry.event_date).toLocaleDateString()}</span>
                   </div>
                   <div className="flex items-center space-x-1">
                     <Users className="h-4 w-4" />
                     <span>{registry.event_type}</span>
                   </div>
                 </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={shareRegistry} className="font-poppins">
                  <Share className="h-4 w-4 mr-2" />
                  Share Registry
                </Button>
              </div>
            </div>

            {/* Share Link */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`${window.location.origin}/guest/${registryId}`}
                    readOnly
                    className="flex-1 px-3 py-2 bg-muted rounded-md text-sm"
                  />
                  <Button onClick={copyShareLink} variant="outline" size="sm">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Progress Overview */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Registry Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{progress}%</div>
                    <p className="text-body">Complete</p>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-4">
                    <div 
                      className="bg-primary h-4 rounded-full transition-all duration-300" 
                      style={{width: `${progress}%`}}
                    ></div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-hint">Total Items</span>
                      <span className="font-medium">{totalItems}</span>
                    </div>
                     <div className="flex justify-between">
                       <span className="text-hint">Reserved</span>
                       <span className="font-medium text-primary">{reservedCount}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-hint">Available</span>
                       <span className="font-medium">{totalItems - reservedCount}</span>
                     </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registry Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 text-primary mr-2" />
                    Registry Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   {totalItems === 0 ? (
                     <div className="text-center py-12">
                       <Package className="h-16 w-16 text-muted mx-auto mb-4" />
                       <p className="text-hint text-lg mb-4">No items in your registry yet</p>
                       <p className="text-body text-sm">Add items to help your guests know what you'd love to receive!</p>
                     </div>
                   ) : (
                     <div className="space-y-4">
                       {registry.items.map((item: any) => {
                         const totalReserved = item.reservations?.reduce((sum: number, reservation: any) => sum + (reservation.quantity_reserved || 0), 0) || 0;
                         const isFullyReserved = totalReserved >= (item.quantity || 1);
                         const remainingQuantity = (item.quantity || 1) - totalReserved;
                         
                         return (
                           <div 
                             key={item.id} 
                             className={`p-4 border rounded-lg ${isFullyReserved ? 'bg-secondary/10 border-primary/20' : 'bg-background'}`}
                           >
                             <div className="flex items-start justify-between">
                               <div className="flex-1">
                                 <h4 className="font-medium text-foreground">{item.name}</h4>
                                 {item.description && (
                                   <p className="text-sm text-body mt-1">{item.description}</p>
                                 )}
                                 <p className="text-xs text-hint mt-1">
                                   Quantity: {item.quantity || 1} 
                                   {totalReserved > 0 && ` (${totalReserved} reserved)`}
                                 </p>
                                 {item.reservations && item.reservations.length > 0 && (
                                   <div className="mt-2 space-y-1">
                                     {item.reservations.map((reservation: any, idx: number) => (
                                       <p key={idx} className="text-xs text-hint">
                                         Reserved by {reservation.guest_name} ({reservation.quantity_reserved || 1})
                                         {reservation.message && `: "${reservation.message}"`}
                                       </p>
                                     ))}
                                   </div>
                                 )}
                               </div>
                               <div className="text-right">
                                 {isFullyReserved ? (
                                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                     Fully Reserved
                                   </span>
                                 ) : remainingQuantity < (item.quantity || 1) ? (
                                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                                     {remainingQuantity} Available
                                   </span>
                                 ) : (
                                   <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-hint">
                                     Available
                                   </span>
                                 )}
                               </div>
                             </div>
                           </div>
                         );
                       })}
                     </div>
                   )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegistryView;
