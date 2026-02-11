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
import { tryDemoModalContract } from '../../data';

type TryDemoModalProps = {
  open: boolean;
  onClose: () => void;
};

const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || tryDemoModalContract.api.fallbackTimeZone;

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

const stripControlChars = (value: string) =>
  Array.from(value)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join('');

const sanitizeText = (value: string) =>
  stripControlChars(value).trim();

const normalizeEmail = (value: string) => sanitizeText(value).toLowerCase();

const isValidE164 = (value: string) => /^\+[1-9]\d{9,14}$/.test(value);

const TryDemoModal = ({ open, onClose }: TryDemoModalProps) => {
  const { api, copy } = tryDemoModalContract;
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
      setError(copy.invalidPhoneError);
      return;
    }
    if (!consent) {
      setError(copy.consentRequiredError);
      return;
    }

    setSubmitting(true);
    setError('');

    const payload: Record<string, unknown> = {
      phone: normalizedPhone,
      consentToAutoCall: true,
      consentTextVersion: api.consentTextVersion,
      demoScenario: api.demoScenario,
      callMode: api.callMode,
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
      const response = await fetch(api.endpoint, {
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
    } catch {
      setError(copy.requestFailedError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{copy.dialogTitle}</DialogTitle>
        <DialogContent>
          {success ? (
          <Stack spacing={1.5} sx={{ paddingTop: 1 }}>
            <Typography variant="body1">{copy.successTitle}</Typography>
            <Typography variant="caption">
              {copy.successCaption}
            </Typography>
            <Button onClick={handleClose} className="hero__primary-cta" disableRipple>
              {copy.closeLabel}
            </Button>
          </Stack>
        ) : (
            <form className="try-demo-form" onSubmit={handleSubmit} data-intent="try-demo-form">
              <Stack spacing={2.5} sx={{ paddingTop: 1 }}>
              <TextField
                label={copy.phoneLabel}
                placeholder={copy.phonePlaceholder}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                fullWidth
              />
              <TextField
                label={copy.nameLabel}
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
              />
              <TextField
                label={copy.companyLabel}
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                fullWidth
              />
              <TextField
                label={copy.emailLabel}
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
                label={copy.consentLabel}
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
                {submitting ? copy.submittingLabel : copy.submitLabel}
              </Button>
            </Stack>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TryDemoModal;
