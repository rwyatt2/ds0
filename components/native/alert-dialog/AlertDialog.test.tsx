import { render, screen } from '@testing-library/react-native';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from './AlertDialog';
describe('AlertDialog (Native)', () => { it('renders trigger', () => { render(<AlertDialog><AlertDialogTrigger>Delete</AlertDialogTrigger><AlertDialogContent>Content</AlertDialogContent></AlertDialog>); expect(screen.getByRole('button')).toBeTruthy(); }); });
