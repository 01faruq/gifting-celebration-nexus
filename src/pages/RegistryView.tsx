
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, ArrowLeft, Share, Copy, Check, Calendar, Users, Package, Edit } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const RegistryView = () => {
  const { registryId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registry, setRegistry] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load registry from localStorage
    const registriesData = localStorage.getItem("gifty-registries");
    if (registriesData) {
      const registries = JSON.parse(registriesData);
      const currentRegistry = registries.find((r: any) => r.id === registryId);
      if (currentRegistry) {
        setRegistry(currentRegistry);
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/dashboard");
    }
  }, [registryId, navigate]);

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

  if (!registry) {
    return <div>Loading...</div>;
  }

  const reservedItems = registry.items?.filter((item: any) => item.reservedBy) || [];
  const availableItems = registry.items?.filter((item: any) => !item.reservedBy) || [];
  const totalItems = registry.items?.length || 0;
  const progress = totalItems > 0 ? Math.round((reservedItems.length / totalItems) * 100) : 0;

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
                    <span>{new Date(registry.eventDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{registry.eventType}</span>
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
                      <span className="font-medium text-primary">{reservedItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-hint">Available</span>
                      <span className="font-medium">{availableItems.length}</span>
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
                    <p className="text-center text-hint py-8">No items in your registry yet</p>
                  ) : (
                    <div className="space-y-4">
                      {registry.items.map((item: any) => (
                        <div 
                          key={item.id} 
                          className={`p-4 border rounded-lg ${item.reservedBy ? 'bg-secondary/10 border-primary/20' : 'bg-background'}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">{item.name}</h4>
                              {item.description && (
                                <p className="text-sm text-body mt-1">{item.description}</p>
                              )}
                              <p className="text-xs text-hint mt-1">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              {item.reservedBy ? (
                                <div>
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                    Reserved
                                  </span>
                                  <p className="text-xs text-hint mt-1">By {item.reservedBy}</p>
                                </div>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-hint">
                                  Available
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
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
