
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  MessageSquare, 
  Star, 
  Edit, 
  Trash, 
  ThumbsUp, 
  Check, 
  X, 
  Image as ImageIcon 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpfulCount: number;
  hasMarkedHelpful?: boolean;
}

const StarRating: React.FC<{ 
  rating: number; 
  editable?: boolean; 
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}> = ({ 
  rating, 
  editable = false, 
  onChange = () => {}, 
  size = 'md'
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  };
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${editable ? 'cursor-pointer' : 'cursor-default'} text-gray-300`}
          onClick={() => editable && onChange(star)}
          onMouseEnter={() => editable && setHoverRating(star)}
          onMouseLeave={() => editable && setHoverRating(0)}
          disabled={!editable}
        >
          <Star
            className={`${sizeClasses[size]} ${
              (hoverRating || rating) >= star
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const FeedbackPage: React.FC = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev-1",
      productId: "prod-1",
      productName: "Wireless Headphones",
      productImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      rating: 4,
      title: "Great Sound Quality!",
      comment: "These headphones are amazing. The sound quality is exceptional, and they're very comfortable to wear for long periods. Battery life is also impressive, lasting well over the advertised 20 hours. Would highly recommend!",
      date: "2023-05-15",
      helpfulCount: 12,
    },
    {
      id: "rev-2",
      productId: "prod-3",
      productName: "Smart Watch",
      productImage: "https://images.unsplash.com/photo-1549482199-bc1ca6f58502",
      rating: 5,
      title: "Best Smartwatch I've Owned",
      comment: "This watch has exceeded all my expectations. The health tracking features are accurate, the battery lasts for days, and it looks stylish on my wrist. The app integration is seamless, and notifications work perfectly.",
      date: "2023-04-28",
      helpfulCount: 8,
    },
    {
      id: "rev-3",
      productId: "prod-6",
      productName: "Mechanical Keyboard",
      productImage: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
      rating: 3,
      title: "Good, but a bit noisy",
      comment: "The keyboard feels great to type on and has nice RGB lighting. However, it's much louder than I expected, which can be annoying in a quiet environment. The software could also use some improvements for better customization.",
      date: "2023-03-10",
      helpfulCount: 5,
    },
  ]);
  
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    images: [] as File[],
  });
  
  const handleMarkHelpful = (reviewId: string) => {
    setReviews(prev => 
      prev.map(review => {
        if (review.id === reviewId) {
          if (review.hasMarkedHelpful) {
            return {
              ...review,
              helpfulCount: review.helpfulCount - 1,
              hasMarkedHelpful: false,
            };
          } else {
            return {
              ...review,
              helpfulCount: review.helpfulCount + 1,
              hasMarkedHelpful: true,
            };
          }
        }
        return review;
      })
    );
  };
  
  const handleDeleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
    
    toast({
      title: "Review deleted",
      description: "Your review has been successfully deleted.",
    });
  };
  
  const handleEditReviewChange = (field: string, value: string | number) => {
    if (editReview) {
      setEditReview({
        ...editReview,
        [field]: value,
      });
    }
  };
  
  const handleEditReviewSubmit = () => {
    if (editReview) {
      setReviews(prev => 
        prev.map(review => 
          review.id === editReview.id ? editReview : review
        )
      );
      
      toast({
        title: "Review updated",
        description: "Your review has been successfully updated.",
      });
      
      setEditReview(null);
    }
  };
  
  const handleNewReviewChange = (field: string, value: string | number) => {
    setNewReview({
      ...newReview,
      [field]: value,
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setNewReview({
        ...newReview,
        images: [...newReview.images, ...filesArray].slice(0, 5), // Limit to 5 images
      });
    }
  };
  
  const handleNewReviewSubmit = () => {
    // In a real app, you'd submit this to your backend
    const newReviewObject: Review = {
      id: `rev-${reviews.length + 1}`,
      productId: "prod-new",
      productName: "Product Name", // This would come from selected product
      productImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", // This would come from selected product
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
    };
    
    setReviews(prev => [newReviewObject, ...prev]);
    
    // Reset form
    setNewReview({
      rating: 5,
      title: '',
      comment: '',
      images: [],
    });
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Product Reviews & Feedback</h1>
      
      <Tabs defaultValue="your-reviews">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="your-reviews">Your Reviews</TabsTrigger>
          <TabsTrigger value="write-review">Write a Review</TabsTrigger>
        </TabsList>
        
        <TabsContent value="your-reviews" className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img 
                          src={review.productImage} 
                          alt={review.productName} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{review.productName}</CardTitle>
                        <CardDescription>
                          Reviewed on {review.date}
                        </CardDescription>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleMarkHelpful(review.id)}
                      className={review.hasMarkedHelpful ? "text-blue-500" : ""}
                    >
                      <ThumbsUp className={`mr-1 h-4 w-4 ${review.hasMarkedHelpful ? "fill-blue-500" : ""}`} />
                      Helpful ({review.helpfulCount})
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Your Review</DialogTitle>
                          <DialogDescription>
                            Make changes to your review of {review.productName}.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                          <div className="flex justify-between items-center">
                            <Label>Rating</Label>
                            <StarRating 
                              rating={editReview?.rating || review.rating} 
                              editable 
                              onChange={(rating) => handleEditReviewChange('rating', rating)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="edit-title">Review Title</Label>
                            <Input
                              id="edit-title"
                              value={editReview?.title || review.title}
                              onChange={(e) => handleEditReviewChange('title', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="edit-comment">Review Comment</Label>
                            <Textarea
                              id="edit-comment"
                              rows={5}
                              value={editReview?.comment || review.comment}
                              onChange={(e) => handleEditReviewChange('comment', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={handleEditReviewSubmit}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          <Trash className="mr-1 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Review</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete your review for {review.productName}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteReview(review.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
              <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't written any product reviews yet.
              </p>
              <Button onClick={() => document.getElementById('write-review-tab')?.click()}>
                Write Your First Review
              </Button>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="write-review" className="space-y-6" id="write-review-tab">
          <Card>
            <CardHeader>
              <CardTitle>Write a Product Review</CardTitle>
              <CardDescription>
                Share your thoughts on a product you've purchased
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-select">Select Product</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product you purchased" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product-1">Wireless Headphones</SelectItem>
                      <SelectItem value="product-2">Smart Watch</SelectItem>
                      <SelectItem value="product-3">Bluetooth Speaker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label>Your Rating</Label>
                  <StarRating 
                    rating={newReview.rating} 
                    editable 
                    size="lg"
                    onChange={(rating) => handleNewReviewChange('rating', rating)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="review-title">Review Title</Label>
                  <Input
                    id="review-title"
                    placeholder="Summarize your experience"
                    value={newReview.title}
                    onChange={(e) => handleNewReviewChange('title', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="review-comment">Your Review</Label>
                  <Textarea
                    id="review-comment"
                    placeholder="What did you like or dislike about this product?"
                    rows={6}
                    value={newReview.comment}
                    onChange={(e) => handleNewReviewChange('comment', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Add Photos (Optional)</Label>
                  <div className="flex flex-wrap gap-2">
                    {newReview.images.map((file, index) => (
                      <div 
                        key={index}
                        className="relative h-20 w-20 rounded-md overflow-hidden border"
                      >
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Upload ${index + 1}`} 
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-0.5 right-0.5 bg-black bg-opacity-50 rounded-full p-0.5"
                          onClick={() => setNewReview({
                            ...newReview,
                            images: newReview.images.filter((_, i) => i !== index)
                          })}
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                    
                    {newReview.images.length < 5 && (
                      <label
                        htmlFor="image-upload"
                        className="h-20 w-20 rounded-md border border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You can upload up to 5 images. Accepted formats: JPG, PNG, GIF.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleNewReviewSubmit}>Submit Review</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Review Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Be Specific</p>
                    <p className="text-muted-foreground">
                      Share what you liked or disliked about the product and why.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Be Honest</p>
                    <p className="text-muted-foreground">
                      Your review should reflect your genuine experience with the product.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Be Helpful</p>
                    <p className="text-muted-foreground">
                      Mention specific features, quality, and value for money.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <X className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Avoid</p>
                    <p className="text-muted-foreground">
                      Offensive language, personal information, or off-topic comments.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackPage;
