import { useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type TryDemoModalProps = {
  open: boolean;
  onClose: () => void;
};

const TRY_DEMO_ENDPOINT = 'https://f2c1c2d7f64e.ngrok-free.app/api/marketing/try-demo';
const CONSENT_TEXT_VERSION = 'try-demo-v1';
const DEMO_SCENARIO = 'hvac';

const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';

const getUtmParams = () => {
  if (typeof window === 'undefined') return undefined;
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source') || undefined;
  const medium = params.get('utm_medium') || undefined;
  const campaign = params.get('utm_campaign') || undefined;
  if (!source && !medium && !campaign) return undefined;
  return {
    source,
    medium,
    campaign,
  };
};

const normalizePhone = (value: string) => {
  const trimmed = value.trim();
  if (trimmed.startsWith('+')) return trimmed;
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return trimmed;
};

const sanitizeText = (value: string) =>
  value.replace(/[\u0000-\u001F\u007F]/g, '').trim();

const normalizeEmail = (value: string) => sanitizeText(value).toLowerCase();

const isValidE164 = (value: string) => /^\+[1-9]\d{9,14}$/.test(value);

const TryDemoModal = ({ open, onClose }: TryDemoModalProps) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const utm = useMemo(getUtmParams, [open]);

  const handleClose = () => {
    if (submitting) return;
    onClose();
    setError('');
    setSuccess(false);
    setPhone('');
    setName('');
    setCompany('');
    setEmail('');
    setConsent(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedPhone = normalizePhone(phone);
    if (!isValidE164(normalizedPhone)) {
      setError('Enter a valid phone number (10 digits or +E.164).');
      return;
    }
    if (!consent) {
      setError('Consent is required to request a demo call.');
      return;
    }

    setSubmitting(true);
    setError('');

    const payload: Record<string, unknown> = {
      phone: normalizedPhone,
      consentToAutoCall: true,
      consentTextVersion: CONSENT_TEXT_VERSION,
      demoScenario: DEMO_SCENARIO,
      callMode: 'immediate',
      timezone: getTimeZone(),
    };

    const safeName = sanitizeText(name);
    const safeCompany = sanitizeText(company);
    const safeEmail = normalizeEmail(email);

    if (safeName) payload.name = safeName;
    if (safeCompany) payload.company = safeCompany;
    if (safeEmail) payload.email = safeEmail;
    if (utm) payload.utm = utm;
    if (typeof window !== 'undefined') payload.referrerUrl = window.location.href;

    try {
      const response = await fetch(TRY_DEMO_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Try the AI CSR</DialogTitle>
        <DialogContent>
          {success ? (
          <Stack spacing={1.5} sx={{ paddingTop: 1 }}>
            <Typography variant="body1">Calling you now — please answer your phone.</Typography>
            <Typography variant="caption">
              Most demos connect in under 30 seconds.
            </Typography>
            <Button onClick={handleClose} className="hero__primary-cta" disableRipple>
              Close
            </Button>
          </Stack>
        ) : (
            <form className="try-demo-form" onSubmit={handleSubmit} data-intent="try-demo-form">
              <Stack spacing={2.5} sx={{ paddingTop: 1 }}>
              <TextField
                label="Phone (E.164)"
                placeholder="+12165551234"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                fullWidth
              />
              <TextField
                label="First name (optional)"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
              />
              <TextField
                label="Company (optional)"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                fullWidth
              />
              <TextField
                label="Email (optional)"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    required
                  />
                }
                label="I agree to receive an automated call/text for a demo."
              />
              {error ? (
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
              ) : null}
              <Button
                className="hero__primary-cta"
                disableRipple
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Try Demo'}
              </Button>
            </Stack>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TryDemoModal;
