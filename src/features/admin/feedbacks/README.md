# Admin Feedback Management System

This folder contains all the components for managing user feedback in the admin panel.

## Components

### 1. FeedbackList (`feedback-list.tsx`)

The main component that orchestrates the entire feedback management system.

**Features:**

- Displays feedback statistics and overview
- Search functionality across feedback content, user names, and emails
- Filter by status (pending, reviewed, resolved)
- Sort by date created, last updated, rating, or user name
- Pagination-ready structure
- Delete feedback functionality

**Props:** None (self-contained)

### 2. FeedbackStats (`feedback-stats.tsx`)

Shows statistical overview of all feedbacks.

**Features:**

- Total feedback count
- Average rating
- Unique users count
- Resolution rate percentage
- Status breakdown with percentages

**Props:**

- `feedbacks`: Array of FeedbackData objects

### 3. FeedbackItem (`feedback-item.tsx`)

Individual feedback card component.

**Features:**

- Status badge with color coding
- Star rating display
- User information (name, email)
- Creation and update dates
- Delete button with confirmation
- Responsive design

**Props:**

- `feedback`: FeedbackData object
- `onDelete`: Function to handle delete action
- `isDeleting`: Boolean indicating delete in progress

### 4. FeedbackFilters (`feedback-filters.tsx`)

Advanced filtering and sorting controls.

**Features:**

- Status filter dropdown with counts
- Sort options (date, rating, user name)
- Sort direction (ascending/descending)
- Clear filters functionality
- Visual indicators for active filters

**Props:**

- `onStatusFilter`: Function to handle status filtering
- `onSortChange`: Function to handle sort changes
- `currentStatus`: Currently selected status filter
- `currentSort`: Current sort configuration
- `statusCounts`: Object with status counts

### 5. FeedbackDeleteDialog (`feedback-delete-dialog.tsx`)

Confirmation dialog for deleting feedback.

**Features:**

- Preview of feedback content to be deleted
- User information display
- Loading state during deletion
- Destructive action styling

**Props:**

- `open`: Boolean controlling dialog visibility
- `onOpenChange`: Function to handle dialog state
- `onConfirm`: Function to confirm deletion
- `feedback`: FeedbackData object to delete
- `isDeleting`: Boolean indicating deletion in progress

## Data Types

### FeedbackData Interface

```typescript
export interface FeedbackData {
  id: string;
  content: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: "pending" | "reviewed" | "resolved";
  rating?: number;
}
```

## API Integration

The components use the following RTK Query hooks from `feedback-services.ts`:

- `useGetAllFeedbacksQuery`: Fetches all feedbacks
- `useDeleteFeedbackMutation`: Deletes a feedback

## Usage

```tsx
import { FeedbackList } from "@/features/admin/feedbacks";

export default function FeedbackManagementPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-primary mb-6 text-3xl font-bold">
        Feedback Management
      </h1>
      <FeedbackList />
    </div>
  );
}
```

## Features

### Search & Filter

- **Text Search**: Search across feedback content, user names, and emails
- **Status Filter**: Filter by pending, reviewed, or resolved status
- **Smart Filtering**: Combines search and status filters

### Sorting

- **Date Created**: Sort by when feedback was submitted
- **Last Updated**: Sort by when feedback was last modified
- **Rating**: Sort by user rating (if provided)
- **User Name**: Sort alphabetically by user name
- **Sort Direction**: Ascending or descending for all sort options

### User Experience

- **Loading States**: Skeleton loading for better UX
- **Error Handling**: Graceful error display with retry options
- **Toast Notifications**: Success/error messages for actions
- **Responsive Design**: Works on all screen sizes
- **Confirmation Dialogs**: Prevents accidental deletions

### Statistics Dashboard

- **Total Count**: Number of feedbacks
- **Average Rating**: Overall rating average
- **Unique Users**: Count of distinct users
- **Resolution Rate**: Percentage of resolved feedbacks
- **Status Breakdown**: Visual breakdown by status

## Styling

Uses Tailwind CSS with shadcn/ui components for:

- Consistent design system
- Dark/light mode support
- Accessible components
- Professional appearance

## Future Enhancements

Potential improvements that could be added:

1. **Bulk Actions**: Select multiple feedbacks for batch operations
2. **Status Updates**: Change feedback status directly from the list
3. **Export**: Export feedbacks to CSV/Excel
4. **Advanced Filters**: Date range, rating range filters
5. **Feedback Details**: Modal or drawer for full feedback view
6. **Response System**: Admin responses to feedback
7. **Categories**: Categorize feedbacks by type
8. **Analytics**: Charts and graphs for feedback trends
