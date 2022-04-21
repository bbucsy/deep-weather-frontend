import { TextProps, Text } from '@chakra-ui/react'

export const Paragraph: React.FC<TextProps> = ({
    children,
    textAlign,
    ...props
}) => (
    <Text marginTop={5} {...props} textAlign={textAlign}>
        {children}
    </Text>
)
