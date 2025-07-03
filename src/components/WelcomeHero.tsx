
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomeHero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gift className="h-8 w-8 text-primary" />
            <span className="text-2xl font-poppins font-bold text-foreground">Gifty</span>
          </div>
          <Link to="/auth">
            <Button variant="outline" size="sm" className="font-poppins">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-foreground leading-tight">
              Celebrate <span className="text-primary">intentionally</span>
            </h1>
            <p className="text-xl md:text-2xl text-body max-w-3xl mx-auto">
              No more duplicate gifts. Create your registry, let guests reserve what they'll bring, 
              and get exactly what you need for your special day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button size="lg" className="font-poppins font-medium px-8 py-3 text-lg">
                Create Your Registry
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="font-poppins font-medium px-8 py-3 text-lg">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-poppins font-semibold">Share Your Wishes</h3>
            <p className="text-body">
              Tell your guests exactly what you need. No more guessing games for gifts.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-poppins font-semibold">Let Them Reserve</h3>
            <p className="text-body">
              Your guests can see what others have chosen. No duplicate gifts ever again!
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-poppins font-semibold">Celebrate Properly</h3>
            <p className="text-body">
              Get exactly what you need. Make your celebration more meaningful and organized.
            </p>
          </Card>
        </div>

        {/* Sample Registry Preview */}
        <div className="mt-20" id="preview">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-semibold text-foreground mb-4">
              See How It Works
            </h2>
            <p className="text-lg text-body">
              This is how your registry will appear to your guests
            </p>
          </div>

          <Card className="max-w-2xl mx-auto p-8 bg-white shadow-xl">
            <div className="text-center space-y-6">
              <div>
                <h3 className="text-2xl font-poppins font-bold text-foreground">
                  Adunni's 25th Birthday
                </h3>
                <p className="text-body mt-2">
                  "Thank you for making my day special! Please choose something you'd like to bring."
                </p>
              </div>

              <div className="bg-secondary/10 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-hint">Progress</span>
                  <span className="text-sm font-medium text-primary">7 of 12 gifts reserved</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full transition-all duration-300" style={{width: '58%'}}></div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Kitchen Blender</h4>
                    <p className="text-sm text-hint">For my morning smoothies</p>
                  </div>
                  <Button size="sm" className="font-poppins">Reserve This</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                  <div>
                    <h4 className="font-medium text-foreground">Bed Sheets Set</h4>
                    <p className="text-sm text-hint">White or cream color</p>
                  </div>
                  <Button size="sm" variant="secondary" disabled className="font-poppins">
                    Reserved
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WelcomeHero;
