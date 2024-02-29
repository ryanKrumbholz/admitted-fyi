import { Button } from '~/app/_components/button';
import { TextField } from '~/app/_components/text-field';
import { api } from '~/trpc/server';

export default async function DecisionsPage() {

  const handleSubmit = () => {
    // api.decision.add.mutate()
  }

  return (
  <div className="container mx-auto">
    <TextField/>
    <Button/>
  </div>
);
}
