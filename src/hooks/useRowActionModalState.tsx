import { useCallback, useMemo, useState } from "react";

interface UseRowActionModalStateOptions {
  enableView?: boolean;
  enableEdit?: boolean;
  enableDelete?: boolean;
  enableStatusChange?: boolean;
  enableApprove?: boolean;
  enableReject?: boolean;
  enableRevision?: boolean;
}

export const useRowActionModalState = <TData,>({
  enableView = true,
  enableEdit = true,
  enableDelete = true,
  enableStatusChange = true,
  enableApprove = true,
  enableReject = true,
  enableRevision = true,
}: UseRowActionModalStateOptions = {}) => {
  // Original states
  const [viewingItem, setViewingItem] = useState<TData | null>(null);
  const [editingItem, setEditingItem] = useState<TData | null>(null);
  const [deletingItem, setDeletingItem] = useState<TData | null>(null);
  const [statusItem, setStatusItem] = useState<TData | null>(null);

  // New submission-specific states
  const [approvingItem, setApprovingItem] = useState<TData | null>(null);
  const [rejectingItem, setRejectingItem] = useState<TData | null>(null);
  const [revisionItem, setRevisionItem] = useState<TData | null>(null);

  // Original dialog states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // New submission dialog states
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isRevisionDialogOpen, setIsRevisionDialogOpen] = useState(false);

  // Original handlers
  const handleView = useCallback((item: TData) => {
    setViewingItem(item);
    setIsViewDialogOpen(true);
  }, []);

  const handleEdit = useCallback((item: TData) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback((item: TData) => {
    setDeletingItem(item);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleStatusChange = useCallback((item: TData) => {
    setStatusItem(item);
    setIsStatusModalOpen(true);
  }, []);

  // New submission handlers
  const handleApprove = useCallback((item: TData) => {
    setApprovingItem(item);
    setIsApproveDialogOpen(true);
  }, []);

  const handleReject = useCallback((item: TData) => {
    setRejectingItem(item);
    setIsRejectDialogOpen(true);
  }, []);

  const handleRevision = useCallback((item: TData) => {
    setRevisionItem(item);
    setIsRevisionDialogOpen(true);
  }, []);

  // Original dialog open/close handlers
  const onViewOpenChange = useCallback((open: boolean) => {
    setIsViewDialogOpen(open);
    if (!open) setViewingItem(null);
  }, []);

  const onEditOpenChange = useCallback((open: boolean) => {
    setIsEditModalOpen(open);
    if (!open) setEditingItem(null);
  }, []);

  const onDeleteOpenChange = useCallback((open: boolean) => {
    setIsDeleteDialogOpen(open);
    if (!open) setDeletingItem(null);
  }, []);

  const onStatusOpenChange = useCallback((open: boolean) => {
    setIsStatusModalOpen(open);
    if (!open) setStatusItem(null);
  }, []);

  // New submission dialog open/close handlers
  const onApproveOpenChange = useCallback((open: boolean) => {
    setIsApproveDialogOpen(open);
    if (!open) setApprovingItem(null);
  }, []);

  const onRejectOpenChange = useCallback((open: boolean) => {
    setIsRejectDialogOpen(open);
    if (!open) setRejectingItem(null);
  }, []);

  const onRevisionOpenChange = useCallback((open: boolean) => {
    setIsRevisionDialogOpen(open);
    if (!open) setRevisionItem(null);
  }, []);

  // Table actions object with all actions
  const tableActions = useMemo(() => {
    return {
      onView: enableView ? handleView : undefined,
      onEdit: enableEdit ? handleEdit : undefined,
      onDelete: enableDelete ? handleDelete : undefined,
      onStatusChange: enableStatusChange ? handleStatusChange : undefined,
      onApprove: enableApprove ? handleApprove : undefined,
      onReject: enableReject ? handleReject : undefined,
      onRevision: enableRevision ? handleRevision : undefined,
    };
  }, [
    enableView,
    enableEdit,
    enableDelete,
    enableStatusChange,
    enableApprove,
    enableReject,
    enableRevision,
    handleView,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleApprove,
    handleReject,
    handleRevision,
  ]);

  return {
    // Original items
    viewingItem,
    editingItem,
    deletingItem,
    statusItem,

    // New submission items
    approvingItem,
    rejectingItem,
    revisionItem,

    // Original dialog states
    isViewDialogOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    isStatusModalOpen,

    // New submission dialog states
    isApproveDialogOpen,
    isRejectDialogOpen,
    isRevisionDialogOpen,

    // Original handlers
    onViewOpenChange,
    onEditOpenChange,
    onDeleteOpenChange,
    onStatusOpenChange,

    // New submission handlers
    onApproveOpenChange,
    onRejectOpenChange,
    onRevisionOpenChange,

    // Table actions
    tableActions,
  };
};
