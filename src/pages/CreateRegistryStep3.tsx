
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, ArrowLeft, Share, Copy, Check, Calendar, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { saveRegistry } from "@/utils/registryStorage";
import { useToast } from "@/hooks/use-toast";

const CreateRegistryStep3 = () => {
  const [eventData, setEventData] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const shareableLink = "https://gifty.app/guest/preview";

  useEffect(() => {
    const step1Data = localStorage.getItem("registry-step1");
    const step2Data = localStorage.getItem("registry-step2");
    
    if (step1Data) setEventData(JSON.parse(step1Data));
    if (step2Data) setItems(JSON.parse(step2Data));
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard",
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

  const publishRegistry = () => {
    if (!eventData || items.length === 0) {
      toast({
        title: "Error",
        description: "Missing registry data. Please go back and complete all steps.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);

    try {
      // Get current user
      const userData = localStorage.getItem("gifty-user");
      const user = userData ? JSON.parse(userData) : { name: "Unknown User" };

      // Save registry
      const newRegistry = saveRegistry({
        title: eventData.title,
        eventType: eventData.eventType,
        eventDate: eventData.eventDate,
        message: eventData.message || "",
        items: items.map(item => ({
          ...item,
          id: item.id || Date.now().toString() + Math.random()
        })),
        userId: user.email || user.name
      });

      // Clear temp data
      localStorage.removeItem("registry-step1");
      localStorage.removeItem("registry-step2");

      toast({
        title: "Registry Published! 🎉",
        description: "Your registry is now live and ready to share!",
      });

      // Navigate to the new registry view
      navigate(`/registry/${newRegistry.id}`);
    } catch (error) {
      toast({
        title: "Error Publishing Registry",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsPublishing(false);
    }
  };

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <Gift className="h-16 w-16 text-muted mx-auto mb-4" />
          <h3 className="text-xl font-poppins font-semibold mb-2">Loading...</h3>
          <p className="text-body">Preparing your registry preview</p>
        </div>
      </div>
    );
  }

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
            <Link to="/create-registry/step2">
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
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">✓</div>
                <span className="ml-2 text-sm font-medium text-primary">Add Items</span>
              </div>
              <div className="w-12 h-px bg-primary"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <span className="ml-2 text-sm font-medium text-primary">Review & Share</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">
              Almost Done! 🎉
            </h1>
            <p className="text-body">
              Review your registry and share it with your people
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Registry Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  Registry Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-poppins font-bold text-foreground">
                    {eventData.title}
                  </h3>
                  <p className="text-body">
                    {eventData.eventType} • {new Date(eventData.eventDate).toLocaleDateString()}
                  </p>
                  {eventData.message && (
                    <p className="text-sm text-body italic border-l-4 border-primary/20 pl-4 py-2">
                      "{eventData.message}"
                    </p>
                  )}
                </div>

                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-hint">Total Items</span>
                    <span className="text-sm font-medium text-primary">{items.length} gifts</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 text-primary mr-2" />
                    <span className="font-medium">Items in your registry:</span>
                  </div>
                  {items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{item.name}</h4>
                        {item.description && (
                          <p className="text-xs text-hint">{item.description}</p>
                        )}
                      </div>
                      <span className="text-xs text-hint">Qty: {item.quantity}</span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-hint text-center">
                      ... and {items.length - 3} more items
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Share Registry */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share className="h-5 w-5 text-primary mr-2" />
                  Share Your Registry
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Your Shareable Link</h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={shareableLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-muted rounded-md text-sm"
                    />
                    <Button onClick={copyLink} variant="outline" size="sm">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-sm text-secondary mt-1">Link copied to clipboard!</p>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Ways to Share:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="font-poppins">
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="font-poppins">
                      Instagram
                    </Button>
                    <Button variant="outline" className="font-poppins">
                      SMS
                    </Button>
                    <Button variant="outline" className="font-poppins">
                      Email
                    </Button>
                  </div>
                </div>

                <div className="bg-secondary/10 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-2">💡 Pro Tip</h4>
                  <p className="text-sm text-body">
                    Share this link with your friends and family. They can reserve gifts without needing to create an account!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button 
              onClick={publishRegistry} 
              className="font-poppins px-8" 
              size="lg"
              disabled={isPublishing}
            >
              {isPublishing ? "Publishing..." : "Publish Registry & Go Live! 🎉"}
            </Button>
            <p className="text-sm text-hint mt-2">
              You can always edit your registry later from the dashboard
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateRegistryStep3;
