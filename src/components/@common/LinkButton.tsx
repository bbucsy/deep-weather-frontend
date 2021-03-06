import { Button, ButtonProps } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export type LinkProps = {
    external?: boolean
    href: string
    newTab?: boolean
}

export const LinkButton: FC<LinkProps & ButtonProps> = ({
    external,
    href,
    children,
    newTab = true,
    ...props
}) => {
    const navigate = useNavigate()
    return (
        <Button
            {...props}
            onClick={() => {
                if (external) {
                    if (newTab) {
                        window.open(href)
                    } else {
                        // eslint-disable-next-line no-restricted-globals
                        location.href = href
                    }
                } else navigate(href)
            }}
        >
            {children}
        </Button>
    )
}
