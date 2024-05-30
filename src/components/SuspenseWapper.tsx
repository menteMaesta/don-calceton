import { Suspense, ReactNode } from "react";
import Loader from "components/Loader";

export default function SuspenseWapper({
  children,
  loaderClassName,
}: {
  children: ReactNode;
  loaderClassName?: string;
}) {
  return (
    <Suspense fallback={<Loader className={loaderClassName} />}>
      {children}
    </Suspense>
  );
}
