import { Button } from '~/app/_components/button';
import { TextField } from '~/app/_components/text-field';
import { api } from '~/trpc/server';
import NewDecisionForm from '../_components/new-decision-form';

export default async function DecisionsPage() {

  const handleSubmit = () => {
    // api.decision.add.mutate()
  }

  return (
  <div className="container mx-auto max-w-2xl">
    <h1 className='font-bold text-2xl mb-5'>
      New Decision Form
    </h1>
    <NewDecisionForm/>
  </div>
);
}
