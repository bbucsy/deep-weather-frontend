export interface NavItem {
    text: string
    link: string
    loginRequired?: boolean
    adminRequired?: boolean
}

export const NavItems: NavItem[] = [
    {
        text: 'Cities',
        link: '/city',
        loginRequired: true,
    },
    {
        text: 'Predictions',
        link: '/predictions',
    },
]
