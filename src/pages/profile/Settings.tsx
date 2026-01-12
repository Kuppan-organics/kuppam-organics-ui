import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetApiAuthProfile, usePutApiAuthProfile } from "@/api/generated/authentication/authentication";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getGetApiAuthProfileQueryKey } from "@/api/generated/authentication/authentication";

export default function Settings() {
  const queryClient = useQueryClient();
  const { data: profileData, isLoading } = useGetApiAuthProfile();
  const user = profileData?.user;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
      country: user?.address?.country || "",
    },
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);

  // Update form data when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          zipCode: user.address?.zipCode || "",
          country: user.address?.country || "",
        },
      });
    }
  }, [user]);

  const updateProfileMutation = usePutApiAuthProfile({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetApiAuthProfileQueryKey() });
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
        setIsEditingProfile(false);
      },
      onError: (error: any) => {
        toast({
          title: "Update failed",
          description: error.response?.data?.message || "Failed to update profile",
          variant: "destructive",
        });
      },
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleProfileSave = () => {
    updateProfileMutation.mutate({
      data: {
        name: formData.name,
        phone: formData.phone,
      },
    });
  };

  const handleBillingSave = () => {
    updateProfileMutation.mutate({
      data: {
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zipCode: formData.address.zipCode,
          country: formData.address.country,
        },
      },
    });
    setIsEditingBilling(false);
  };

  const formatAddress = () => {
    const parts = [
      formData.address.street,
      formData.address.city,
      formData.address.state,
      formData.address.zipCode,
      formData.address.country,
    ].filter(Boolean);
    return parts.join(", ") || "No address set";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-card border-border/50 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-xl font-bold text-foreground">
              Profile Information
            </CardTitle>
            {!isEditingProfile ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingProfile(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingProfile(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={handleProfileSave}
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profilePhoto} alt={formData.name} />
              <AvatarFallback className="bg-accent/10 text-accent text-2xl font-semibold">
                {getInitials(formData.name)}
              </AvatarFallback>
            </Avatar>

            <div className="w-full max-w-md space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditingProfile || updateProfileMutation.isPending}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="mt-1 bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed
                </p>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!isEditingProfile || updateProfileMutation.isPending}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Address Settings */}
      <Card className="bg-card border-border/50 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-xl font-bold text-foreground">
              Billing Address
            </CardTitle>
            {!isEditingBilling ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingBilling(true)}
              >
                Edit Address
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingBilling(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={handleBillingSave}
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-md space-y-4">
            <div>
              <Label htmlFor="billing-street">Street Address</Label>
              <Input
                id="billing-street"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  })
                }
                disabled={!isEditingBilling || updateProfileMutation.isPending}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billing-city">City</Label>
                <Input
                  id="billing-city"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                  disabled={!isEditingBilling || updateProfileMutation.isPending}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="billing-state">State</Label>
                <Input
                  id="billing-state"
                  value={formData.address.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value },
                    })
                  }
                  disabled={!isEditingBilling || updateProfileMutation.isPending}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billing-zip">Zip Code</Label>
                <Input
                  id="billing-zip"
                  value={formData.address.zipCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, zipCode: e.target.value },
                    })
                  }
                  disabled={!isEditingBilling || updateProfileMutation.isPending}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="billing-country">Country</Label>
                <Input
                  id="billing-country"
                  value={formData.address.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, country: e.target.value },
                    })
                  }
                  disabled={!isEditingBilling || updateProfileMutation.isPending}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
