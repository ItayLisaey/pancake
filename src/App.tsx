import { BaseButton } from '../lib';
import { IconButton } from '../lib/component/IconButton';
import { TextButton } from '../lib/component/TextButton';
import { Heli } from './Heli';

function App() {
  return (
    <>
      <BaseButton style={{ color: 'white' }}>BUTTON</BaseButton>
      <TextButton style={{ color: 'white' }}>BUTTON</TextButton>
      <TextButton preText={<Heli />} style={{ color: 'white' }}>BUTTON</TextButton>
      <TextButton style={{ color: 'white' }} postText={<Heli />}>BUTTON</TextButton>
      <TextButton preText={<Heli />} style={{ color: 'white' }} postText={<Heli />}>BUTTON</TextButton>
      <TextButton preText={<Heli />} style={{ color: 'white', fontSize: '30px' }} postText={<Heli />}>BUTTON</TextButton>
      <IconButton style={{ color: 'white' }}><Heli /></IconButton>
    </>
  );
}

export default App;
