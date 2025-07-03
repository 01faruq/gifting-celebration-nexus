import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

const GuestPreview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gift className="h-8 w-8 text-primary" />
            <span className="text-2xl font-poppins font-bold text-foreground">Gifty</span>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="font-poppins">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Demo Registry - Sarah's Wedding
            </h1>
            <p className="text-lg text-body">
              "Help us start our new life together with the things we need!"
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-hint">Progress</span>
                <span className="text-sm font-medium text-primary">8 of 15 gifts reserved</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-primary h-3 rounded-full transition-all duration-300" style={{width: '53%'}}></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {[
              { name: "Kitchen Stand Mixer", description: "For all our baking adventures", available: true },
              { name: "Coffee Machine", description: "We can't start the day without it!", available: false },
              { name: "Dining Table Set", description: "6-seater oak dining table", available: true },
              { name: "Bed Sheet Set", description: "King size, white or cream", available: false },
              { name: "Cookware Set", description: "Non-stick pots and pans", available: true },
              { name: "Air Fryer", description: "For healthy cooking", available: true },
            ].map((item, index) => (
              <Card key={index} className={`transition-all duration-200 ${!item.available ? 'opacity-60' : 'hover:shadow-md'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <p className="text-sm text-hint">{item.description}</p>
                    </div>
                    {item.available ? (
                      <Button size="sm" className="font-poppins">
                        Reserve This
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" disabled className="font-poppins">
                        Reserved
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="p-8 bg-secondary/10">
              <h3 className="text-xl font-poppins font-semibold mb-4">Ready to create your own registry?</h3>
              <p className="text-body mb-6">Join thousands of couples who've made their celebrations stress-free with Gifty.</p>
              <Link to="/auth">
                <Button size="lg" className="font-poppins">
                  Get Started Now
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuestPreview;