import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { earlyAccessModalContract } from '../../data';

type EarlyAccessModalProps = {
  open: boolean;
  onClose: () => void;
};

const stripControlChars = (value: string) =>
  Array.from(value)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join('');

const EarlyAccessModal = ({ open, onClose }: EarlyAccessModalProps) => {
  const { copy, submitIntent } = earlyAccessModalContract;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const normalizeEmail = (value: string) =>
    stripControlChars(value).trim().toLowerCase();

  const handleClose = () => {
    onClose();
    setEmail('');
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const safeEmail = normalizeEmail(email);
    if (!safeEmail) return;
    console.info('[intent]', submitIntent);
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{copy.dialogTitle}</DialogTitle>
      <DialogContent>
        {submitted ? (
          <Stack spacing={1.5} sx={{ paddingTop: 1 }}>
            <Typography variant="body1">{copy.successTitle}</Typography>
            <Button onClick={handleClose} className="hero__primary-cta" disableRipple>
              {copy.closeLabel}
            </Button>
          </Stack>
        ) : (
          <form onSubmit={handleSubmit} className="early-access-form">
            <Stack spacing={2.5} sx={{ paddingTop: 1 }}>
              <TextField
                label={copy.emailLabel}
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
                data-intent={submitIntent}
              >
                {copy.submitLabel}
              </Button>
            </Stack>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EarlyAccessModal;
