import clsx from 'clsx';
import React, { ComponentProps } from 'react'

type IProps = ComponentProps<"main"> & { children: React.ReactNode, title?: string, className?: string };

const MainLayout = ({ children, title, className }: IProps) => {
  return (
    <main className={clsx('w-full text-center pt-10', className)}>
			{!!title && <h1 className="text-2xl font-medium underline">{title}</h1>}
      <div className="w-full max-w-2xl pt-[100px] mx-auto px-4">{children}</div>
    </main>
  );
};

export default MainLayout;
