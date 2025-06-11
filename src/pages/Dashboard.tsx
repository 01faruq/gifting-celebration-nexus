
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Plus, Share, Eye, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRegistries } from "@/utils/registryStorage";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [registries, setRegistries] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("gifty-user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load real registries
    const userRegistries = getRegistries();
    setRegistries(userRegistries);
  }, []);

  const calculateProgress = (registry: any) => {
    if (!registry.items || registry.items.length === 0) return 0;
    const reservedCount = registry.items.filter((item: any) => item.reservedBy).length;
    return Math.round((reservedCount / registry.items.length) * 100);
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
            <div className="flex items-center space-x-4">
              <span className="text-body">Welcome, {user?.name || "User"}!</span>
              <Link to="/">
                <Button variant="outline" size="sm">Sign Out</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-foreground">Your Registries</h1>
            <p className="text-body mt-2">Manage your gift registries and track reservations</p>
          </div>
          <Link to="/create-registry">
            <Button size="lg" className="font-poppins">
              <Plus className="h-5 w-5 mr-2" />
              Create New Registry
            </Button>
          </Link>
        </div>

        {/* Registry Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {registries.map((registry) => {
            const progress = calculateProgress(registry);
            const reservedCount = registry.items?.filter((item: any) => item.reservedBy).length || 0;
            const totalItems = registry.items?.length || 0;

            return (
              <Card key={registry.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{registry.title}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-primary">
                      Active
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-body">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(registry.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{registry.eventType}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-hint">Progress</span>
                      <span className="text-sm font-medium text-primary">
                        {reservedCount} of {totalItems} items reserved
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full transition-all duration-300" 
                        style={{width: `${progress}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link to={`/registry/${registry.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link to={`/guest/${registry.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {registries.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Gift className="h-16 w-16 text-muted mx-auto mb-4" />
              <h3 className="text-xl font-poppins font-semibold mb-2">No registries yet</h3>
              <p className="text-body mb-6">Create your first registry to start celebrating!</p>
              <Link to="/create-registry">
                <Button className="font-poppins">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Registry
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
