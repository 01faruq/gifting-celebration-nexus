
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Heart, Share, Calendar } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

const GuestThankYou = () => {
  const { registryId } = useParams();
  const location = useLocation();
  const { itemName, guestName } = location.state || {};

  const shareableLink = `https://gifty.app/guest/${registryId}`;

  const shareRegistry = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this gift registry',
        text: 'Someone is celebrating and needs our help!',
        url: shareableLink
      });
    } else {
      // Fallback to copy
      navigator.clipboard.writeText(shareableLink);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="pt-12 pb-8">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-primary" />
            </div>

            {/* Thank You Message */}
            <div className="space-y-4 mb-8">
              <h1 className="text-3xl font-poppins font-bold text-foreground">
                Oya now! Thanks o! 🎉
              </h1>
              <p className="text-lg text-body">
                {guestName}, your gift don land for the registry!
              </p>
              {itemName && (
                <div className="bg-secondary/10 rounded-lg p-4 mx-auto max-w-md">
                  <p className="text-body">
                    <strong>You reserved:</strong> {itemName}
                  </p>
                </div>
              )}
            </div>

            {/* What's Next */}
            <div className="space-y-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Calendar className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-poppins font-semibold text-foreground">
                    Remember the Date
                  </h3>
                  <p className="text-sm text-body">
                    Don't forget to bring your gift on the event day. The host is counting on you!
                  </p>
                </div>
                <div className="space-y-3">
                  <Share className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-poppins font-semibold text-foreground">
                    Spread the Love
                  </h3>
                  <p className="text-sm text-body">
                    Share this registry with others who might want to participate too!
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={shareRegistry} variant="outline" className="font-poppins">
                  <Share className="h-4 w-4 mr-2" />
                  Share Registry
                </Button>
                <Link to={`/guest/${registryId}/browse`}>
                  <Button variant="outline" className="font-poppins w-full sm:w-auto">
                    <Gift className="h-4 w-4 mr-2" />
                    Reserve Another Gift
                  </Button>
                </Link>
              </div>

              <Link to="/">
                <Button className="font-poppins">
                  Create My Own Registry
                </Button>
              </Link>
            </div>

            {/* Footer Message */}
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-hint">
                Thanks for using Gifty to make celebrations more meaningful! 💝
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestThankYou;
