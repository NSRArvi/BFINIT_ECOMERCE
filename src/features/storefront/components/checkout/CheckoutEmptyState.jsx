export default function CheckoutEmptyState({ icon: Icon, title, description }) {
  return (
    <div className="border-border bg-background border py-8 text-center">
      <Icon className="text-muted-foreground mx-auto mb-3 h-5 w-5" />
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-muted-foreground mx-auto mt-2 max-w-md text-xs leading-5">
        {description}
      </p>
    </div>
  );
}
