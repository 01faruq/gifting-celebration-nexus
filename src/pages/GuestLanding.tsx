
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Calendar, Users, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const GuestLanding = () => {
  const { registryId } = useParams();

  // Sample data based on registry ID
  const registryData = {
    "1": {
      title: "Adunni's 25th Birthday",
      hostName: "Adunni Okafor",
      eventType: "Birthday Celebration",
      eventDate: "July 15, 2024",
      message: "Thank you for making my day special! Pick something wey you go bring come. I really appreciate each and every one of you! 💕",
      totalItems: 12,
      reservedItems: 7,
      progress: 58,
      avatar: "AO"
    },
    "2": {
      title: "Kemi & Tunde's Wedding",
      hostName: "Kemi & Tunde",
      eventType: "Wedding Celebration", 
      eventDate: "August 20, 2024",
      message: "We're so excited to celebrate our special day with you! Please help us start our new journey together by bringing something from our wish list. Thank you for your love and support! 💑",
      totalItems: 25,
      reservedItems: 15,
      progress: 60,
      avatar: "K&T"
    }
  };

  const registry = registryData[registryId as keyof typeof registryData] || registryData["1"];

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
              {registry.avatar}
            </div>
            <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">
              {registry.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-body mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{registry.eventDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{registry.eventType}</span>
              </div>
            </div>
          </div>

          {/* Host Message */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Heart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-poppins font-semibold text-foreground mb-2">
                    Message from {registry.hostName}:
                  </h3>
                  <p className="text-body leading-relaxed">
                    {registry.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                      {registry.reservedItems} of {registry.totalItems} items
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4">
                    <div 
                      className="bg-primary h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2" 
                      style={{width: `${registry.progress}%`}}
                    >
                      <span className="text-xs text-white font-medium">
                        {registry.progress}%
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-body">
                  {registry.totalItems - registry.reservedItems} gifts still available to reserve
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
                See Wetin I Fit Bring
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
