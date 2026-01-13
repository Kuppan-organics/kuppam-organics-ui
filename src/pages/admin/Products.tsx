import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  usePostApiProducts,
  useDeleteApiProductsId,
  usePutApiProductsId,
} from "@/api/generated/products/products";
import { useGetApiAdminProducts } from "@/api/generated/admin/admin";
import { useGetApiProductsCategories } from "@/api/generated/products/products";
import { queryConfig } from "@/lib/queryConfig";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Plus, Trash2, Edit, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { PostApiProductsBody } from "@/api/generated/models";
import { useQueryClient } from "@tanstack/react-query";

const categoryOptions = [
  { value: "fruits", label: "Fresh Fruit" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fish", label: "River Fish" },
  { value: "meat", label: "Chicken & Meat" },
  { value: "drinks", label: "Drink & Water" },
  { value: "yogurt", label: "Yogurt & Ice Cream" },
  { value: "cake", label: "Cake & Bread" },
  { value: "butter", label: "Butter & Cream" },
  { value: "cooking", label: "Cooking" },
];

export default function AdminProducts() {
  const [showForm, setShowForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const queryClient = useQueryClient();
  const isSubmittingRef = useRef(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PostApiProductsBody & { imagesInput: string; quantity?: string }>(
    {
      defaultValues: {
        name: "",
        description: "",
        category: "",
        price: 0,
        discount: 0,
        stock: 0,
        images: [],
        imagesInput: "",
        quantity: "",
      },
    }
  );

  // Register category field for validation
  useEffect(() => {
    register("category", {
      required: "Category is required",
      validate: (value) => {
        if (!value) return "Category is required";
        const isValidCategory = categoryOptions.some(
          (cat) => cat.value === value
        );
        return isValidCategory || "Please select a valid category";
      },
    });
  }, [register]);

  const {
    data: productsData,
    isLoading: productsLoading,
    refetch,
  } = useGetApiAdminProducts(undefined, {
    query: {
      ...queryConfig.admin,
    },
  });
  const { data: categoriesData } = useGetApiProductsCategories({
    query: {
      ...queryConfig.categories,
    },
  });

  const createProductMutation = usePostApiProducts({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Product created",
          description: "The product has been created successfully.",
        });
        reset();
        setShowForm(false);
        setEditingProduct(null);
        isSubmittingRef.current = false;
        // Invalidate and refetch - use prefix matching to catch all variations
        queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey;
            return Array.isArray(key) && key[0] === "/api/admin/products";
          },
        });
        refetch();
      },
      onError: (error: any) => {
        isSubmittingRef.current = false;
        toast({
          title: "Failed to create product",
          description: error.response?.data?.message || "An error occurred",
          variant: "destructive",
        });
      },
    },
  });

  const updateProductMutation = usePutApiProductsId({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Product updated",
          description: "The product has been updated successfully.",
        });
        reset();
        setShowForm(false);
        setEditingProduct(null);
        isSubmittingRef.current = false;
        // Invalidate and refetch - use prefix matching to catch all variations
        queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey;
            return Array.isArray(key) && key[0] === "/api/admin/products";
          },
        });
        refetch();
      },
      onError: (error: any) => {
        isSubmittingRef.current = false;
        toast({
          title: "Failed to update product",
          description: error.response?.data?.message || "An error occurred",
          variant: "destructive",
        });
      },
    },
  });

  const deleteProductMutation = useDeleteApiProductsId({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Product deleted",
          description: "The product has been deleted successfully.",
        });
        setDeleteDialogOpen(false);
        setProductToDelete(null);
        // Invalidate and refetch - use prefix matching to catch all variations
        queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey;
            return Array.isArray(key) && key[0] === "/api/admin/products";
          },
        });
        refetch();
      },
      onError: (error: any) => {
        toast({
          title: "Failed to delete product",
          description: error.response?.data?.message || "An error occurred",
          variant: "destructive",
        });
      },
    },
  });

  const handleDeleteClick = (product: any) => {
    setProductToDelete({ id: product.id, name: product.name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete?.id) {
      deleteProductMutation.mutate({ id: productToDelete.id });
    }
  };

  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
    // Pre-populate form with product data
    setValue("name", product.name || "");
    setValue("description", product.description || "");
    setValue("category", product.category || "");
    setValue("price", product.price || 0);
    setValue("discount", product.discount || 0);
    setValue("stock", product.stock || 0);
    setValue("quantity", product.quantity || "");
    setValue("imagesInput", product.images?.join(", ") || "");
  };

  const handleCancel = () => {
    reset();
    setShowForm(false);
    setEditingProduct(null);
    isSubmittingRef.current = false;
  };

  const onSubmit = (
    data: PostApiProductsBody & { imagesInput: string; quantity?: string }
  ) => {
    // Prevent double submission
    if (isSubmittingRef.current) {
      return;
    }

    // Validate category is selected
    if (!data.category) {
      toast({
        title: "Category required",
        description: "Please select a category for the product.",
        variant: "destructive",
      });
      return;
    }

    // Validate category is in the allowed list
    const isValidCategory = categoryOptions.some(
      (cat) => cat.value === data.category
    );
    if (!isValidCategory) {
      toast({
        title: "Invalid category",
        description: "Please select a valid category from the list.",
        variant: "destructive",
      });
      return;
    }

    // Prevent submission if mutation is already in progress
    if (createProductMutation.isPending || updateProductMutation.isPending) {
      return;
    }

    isSubmittingRef.current = true;

    const images = data.imagesInput
      ? data.imagesInput
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean)
      : [];

    if (editingProduct) {
      // Update existing product
      const updateData: any = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        discount: data.discount ? Number(data.discount) : undefined,
        stock: data.stock ? Number(data.stock) : undefined,
        images: images.length > 0 ? images : undefined,
        quantity: data.quantity ? String(data.quantity).trim() : undefined,
      };

      updateProductMutation.mutate(
        {
          id: editingProduct.id,
          data: updateData,
        },
        {
          onSettled: () => {
            isSubmittingRef.current = false;
          },
        }
      );
    } else {
      // Create new product
      const productData: PostApiProductsBody & { quantity?: string } = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: Number(data.price),
        discount: data.discount ? Number(data.discount) : undefined,
        stock: data.stock ? Number(data.stock) : undefined,
        images: images.length > 0 ? images : undefined,
        quantity: data.quantity ? String(data.quantity).trim() : undefined,
      };

      createProductMutation.mutate(
        { data: productData as any },
        {
          onSettled: () => {
            isSubmittingRef.current = false;
          },
        }
      );
    }
  };

  const products = (productsData as any)?.products || [];

  // Detect duplicate products by name (case-insensitive)
  const getDuplicateCount = (productName: string) => {
    return products.filter(
      (p: any) => p.name?.toLowerCase() === productName?.toLowerCase()
    ).length;
  };

  const isDuplicate = (product: any) => {
    return getDuplicateCount(product.name) > 1;
  };

  // Get all duplicate product names
  const duplicateNames = Array.from(
    new Set(
      products
        .filter((p: any) => isDuplicate(p))
        .map((p: any) => p.name?.toLowerCase())
    )
  );

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-2">
              Manage Products
            </h1>
            <p className="text-muted-foreground">
              Add and manage your product catalog
            </p>
          </div>
          <Button
            onClick={() => {
              if (showForm) {
                handleCancel();
              } else {
                setShowForm(true);
                setEditingProduct(null);
                isSubmittingRef.current = false;
                reset();
              }
            }}
            className="bg-gold hover:bg-gold/90 text-gold-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "Add Product"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </CardTitle>
              <CardDescription>
                {editingProduct
                  ? "Update the product details below"
                  : "Fill in the details to create a new product"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit)(e);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      {...register("name", {
                        required: "Product name is required",
                      })}
                      placeholder="Enter product name"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      onValueChange={(value) => {
                        setValue("category", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      value={watch("category") || ""}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price must be positive" },
                      })}
                      placeholder="0.00"
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      {...register("discount", {
                        min: {
                          value: 0,
                          message: "Discount must be between 0 and 100",
                        },
                        max: {
                          value: 100,
                          message: "Discount must be between 0 and 100",
                        },
                      })}
                      placeholder="0"
                    />
                    {errors.discount && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.discount.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      {...register("stock", {
                        min: { value: 0, message: "Stock must be positive" },
                      })}
                      placeholder="0"
                    />
                    {errors.stock && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="quantity">Product Quantity/Unit *</Label>
                    <Input
                      id="quantity"
                      {...register("quantity", {
                        required: "Product quantity/unit is required",
                      })}
                      placeholder="e.g., 1 kg, 500g, 2 pieces"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      The quantity or unit this price applies to (e.g., "1 kg",
                      "500g", "2 pieces")
                    </p>
                    {errors.quantity && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="imagesInput">
                      Image URLs (comma-separated)
                    </Label>
                    <Input
                      id="imagesInput"
                      {...register("imagesInput")}
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter image URLs separated by commas
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    placeholder="Enter product description"
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={
                      createProductMutation.isPending ||
                      updateProductMutation.isPending
                    }
                    className="bg-gold hover:bg-gold/90 text-gold-foreground"
                  >
                    {createProductMutation.isPending ||
                    updateProductMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {editingProduct ? "Updating..." : "Creating..."}
                      </>
                    ) : editingProduct ? (
                      "Update Product"
                    ) : (
                      "Create Product"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {duplicateNames.length > 0 && (
          <Card className="mb-4 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                    Duplicate Products Detected
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    The following products have duplicate names with different
                    categories: <strong>{duplicateNames.join(", ")}</strong>.
                    Please review and delete the incorrect entries. Products
                    with the wrong category are highlighted in red.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Products</CardTitle>
            <CardDescription>
              List of all products in your catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            {productsLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                  Loading products...
                </p>
              </div>
            ) : products.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product: any) => {
                    const hasDuplicate = isDuplicate(product);
                    return (
                      <TableRow
                        key={product.id}
                        className={
                          hasDuplicate
                            ? "bg-yellow-50 dark:bg-yellow-950/20"
                            : ""
                        }
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {product.name}
                            {hasDuplicate && (
                              <span
                                className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400"
                                title="Duplicate product name detected"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                <span className="font-normal">Duplicate</span>
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              hasDuplicate && product.category !== "fruits"
                                ? "text-red-600 dark:text-red-400 font-medium"
                                : ""
                            }
                          >
                            {product.category}
                          </span>
                        </TableCell>
                        <TableCell>₹{product.price?.toFixed(2)}</TableCell>
                        <TableCell>{product.quantity || "N/A"}</TableCell>
                        <TableCell>{product.stock || 0}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              product.isActive !== false
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.isActive !== false ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditClick(product)}
                              disabled={showForm && !editingProduct}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteClick(product)}
                              disabled={deleteProductMutation.isPending}
                            >
                              {deleteProductMutation.isPending &&
                              productToDelete?.id === product.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">
                  No products found. Create your first product!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                product{" "}
                <span className="font-semibold">{productToDelete?.name}</span>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteProductMutation.isPending}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                disabled={deleteProductMutation.isPending}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteProductMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
}
