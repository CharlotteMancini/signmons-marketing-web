import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type EarlyAccessModalProps = {
  open: boolean;
  onClose: () => void;
};

const EarlyAccessModal = ({ open, onClose }: EarlyAccessModalProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const normalizeEmail = (value: string) =>
    value.replace(/[\u0000-\u001F\u007F]/g, '').trim().toLowerCase();

  const handleClose = () => {
    onClose();
    setEmail('');
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const safeEmail = normalizeEmail(email);
    if (!safeEmail) return;
    console.info('[intent]', 'early-access-submit');
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Join Early Access</DialogTitle>
      <DialogContent>
        {submitted ? (
          <Stack spacing={1.5} sx={{ paddingTop: 1 }}>
            <Typography variant="body1">Thanks — we’ll reach out soon.</Typography>
            <Button onClick={handleClose} className="hero__primary-cta" disableRipple>
              Close
            </Button>
          </Stack>
        ) : (
          <form onSubmit={handleSubmit} className="early-access-form">
            <Stack spacing={2.5} sx={{ paddingTop: 1 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                fullWidth
              />
              <Button
                className="hero__secondary-cta"
                disableRipple
                type="submit"
                data-intent="early-access-submit"
              >
                Join Early Access
              </Button>
            </Stack>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EarlyAccessModal;
