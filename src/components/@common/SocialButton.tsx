import { chakra, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface SocialButtonProps {
    children?: ReactNode
    label: string
    href: string
}

export const SocialButton: React.FC<SocialButtonProps> = ({ children, label, href }) => {
    return (
        <chakra.button
            bg={'gray.100'}
            color="black.900"
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    )
}
