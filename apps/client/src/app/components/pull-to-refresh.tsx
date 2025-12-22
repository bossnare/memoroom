import PullToRefresh from 'react-simple-pull-to-refresh';

export default function PullToRefreshWrapper({
  children,
  onRefresh,
}: {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
}) {
  return (
    <PullToRefresh
      pullingContent={
        <div className="p-4 text-sm ">Tirer vers le bas pour actualiser</div>
      }
      pullDownThreshold={60}
      resistance={2.5}
      onRefresh={onRefresh}
    >
      {children}
    </PullToRefresh>
  );
}
