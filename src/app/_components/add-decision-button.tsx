import Link from 'next/link';
import { Button } from './button';
import React from 'react';

interface AddDecisionButtonLinkProps {
  currentPath: string
}

export const AddDecisionButtonLink: React.FC<AddDecisionButtonLinkProps> = ({currentPath}) => {
  if (currentPath === '/decisions/add') {
    return null;
  }
  return (
      <Link href="/decisions/add" passHref>
        <Button>
          Add Decision
        </Button>
      </Link>
  );
};
