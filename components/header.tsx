import PoeOAuthButton from '@/components/ui/PoeOAuthButton';

const Header: React.FC = () => {

  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='flex flex-col'>
          <PoeOAuthButton/>
        </div>
      </div>
    </div>
  )
}

export default Header;