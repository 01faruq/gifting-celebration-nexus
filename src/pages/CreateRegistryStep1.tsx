
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, ArrowLeft, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const CreateRegistryStep1 = () => {
  const [formData, setFormData] = useState({
    title: "",
    eventType: "",
    eventDate: "",
    message: ""
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if not authenticated
  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.eventType && formData.eventDate) {
      localStorage.setItem("registry-step1", JSON.stringify(formData));
      navigate("/create-registry/step2");
    }
  };

  const eventTypes = [
    "Birthday", "Wedding", "Baby Shower", "Housewarming", 
    "Graduation", "Anniversary", "Engagement", "Other"
  ];

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
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <span className="ml-2 text-sm font-medium text-primary">Event Details</span>
              </div>
              <div className="w-12 h-px bg-muted"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-muted text-hint rounded-full flex items-center justify-center text-sm">2</div>
                <span className="ml-2 text-sm text-hint">Add Items</span>
              </div>
              <div className="w-12 h-px bg-muted"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-muted text-hint rounded-full flex items-center justify-center text-sm">3</div>
                <span className="ml-2 text-sm text-hint">Review & Share</span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                Tell Us About Your Event
              </CardTitle>
              <p className="text-center text-body">
                Let's start with the basics about your celebration
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Adunni's 25th Birthday"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <select
                    id="eventType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                    required
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <textarea
                    id="message"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Thank you for being part of my special day! Please pick something you'd like to bring..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={3}
                  />
                  <p className="text-xs text-hint">This message will be shown to your guests</p>
                </div>

                <Button type="submit" className="w-full font-poppins" size="lg">
                  Next: Add Items
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateRegistryStep1;
