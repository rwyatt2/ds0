import { source } from '@/lib/source';
import {
    DocsPage,
    DocsBody,
    DocsDescription,
    DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';

import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { TokenGrid } from '@/components/TokenGrid';
import { ColorPalette } from '@/components/ColorPalette';
import { SpacingScale } from '@/components/SpacingScale';
import { TypographyScale } from '@/components/TypographyScale';
import { DecisionTree } from '@/components/DecisionTree';
import { DosAndDonts } from '@/components/DosAndDonts';
import { KeyboardTable } from '@/components/KeyboardTable';
import { InstallSnippet } from '@/components/InstallSnippet';

// Component Previews
import { ButtonPreview } from '@/components/previews/components/ButtonPreview';
import { BadgePreview } from '@/components/previews/components/BadgePreview';
import { AlertPreview } from '@/components/previews/components/AlertPreview';
import { CardPreview } from '@/components/previews/components/CardPreview';
import { LinkPreview } from '@/components/previews/components/LinkPreview';
import { CodePreview } from '@/components/previews/components/CodePreview';
import { DividerPreview } from '@/components/previews/components/DividerPreview';
import { HeadingPreview } from '@/components/previews/components/HeadingPreview';
import { TextPreview } from '@/components/previews/components/TextPreview';
import { LabelPreview } from '@/components/previews/components/LabelPreview';
import { TextFieldPreview } from '@/components/previews/components/TextFieldPreview';
import { TextAreaPreview } from '@/components/previews/components/TextAreaPreview';
import { CheckboxPreview } from '@/components/previews/components/CheckboxPreview';
import { RadioGroupPreview } from '@/components/previews/components/RadioGroupPreview';
import { SelectPreview } from '@/components/previews/components/SelectPreview';
import { SwitchPreview } from '@/components/previews/components/SwitchPreview';
import { SliderPreview } from '@/components/previews/components/SliderPreview';
import { TogglePreview } from '@/components/previews/components/TogglePreview';
import { ToggleGroupPreview } from '@/components/previews/components/ToggleGroupPreview';
import { ProgressPreview } from '@/components/previews/components/ProgressPreview';
import { SpinnerPreview } from '@/components/previews/components/SpinnerPreview';
import { SkeletonPreview } from '@/components/previews/components/SkeletonPreview';
import { ToastPreview } from '@/components/previews/components/ToastPreview';
import { ContainerPreview } from '@/components/previews/components/ContainerPreview';
import { GridPreview } from '@/components/previews/components/GridPreview';
import { StackPreview } from '@/components/previews/components/StackPreview';
import { AspectRatioPreview } from '@/components/previews/components/AspectRatioPreview';
import { TablePreview } from '@/components/previews/components/TablePreview';
import { AccordionPreview } from '@/components/previews/components/AccordionPreview';
import { DialogPreview } from '@/components/previews/components/DialogPreview';
import { DrawerPreview } from '@/components/previews/components/DrawerPreview';
import { PopoverPreview } from '@/components/previews/components/PopoverPreview';
import { TooltipPreview } from '@/components/previews/components/TooltipPreview';
import { TabsPreview } from '@/components/previews/components/TabsPreview';
import { BreadcrumbPreview } from '@/components/previews/components/BreadcrumbPreview';
import { PaginationPreview } from '@/components/previews/components/PaginationPreview';
import { FormPreview } from '@/components/previews/components/FormPreview';
import { IconButtonPreview } from '@/components/previews/components/IconButtonPreview';
import { AvatarPreview } from '@/components/previews/components/AvatarPreview';

// Pattern Previews
import { LoginFormPreview } from '@/components/previews/patterns/LoginFormPreview';
import { SignupFormPreview } from '@/components/previews/patterns/SignupFormPreview';
import { ForgotPasswordPreview } from '@/components/previews/patterns/ForgotPasswordPreview';
import { DashboardStatsPreview } from '@/components/previews/patterns/DashboardStatsPreview';
import { EmptyStatePreview } from '@/components/previews/patterns/EmptyStatePreview';
import { ErrorPagePreview } from '@/components/previews/patterns/ErrorPagePreview';
import { SidebarNavPreview } from '@/components/previews/patterns/SidebarNavPreview';
import { NavbarPreview } from '@/components/previews/patterns/NavbarPreview';
import { ProfileSettingsPreview } from '@/components/previews/patterns/ProfileSettingsPreview';
import { NotificationSettingsPreview } from '@/components/previews/patterns/NotificationSettingsPreview';
import { AccountSettingsPreview } from '@/components/previews/patterns/AccountSettingsPreview';
import { DashboardLayoutPreview } from '@/components/previews/patterns/DashboardLayoutPreview';
import { DataGridPlayground } from '@/components/previews/components/DataGridPlayground';

// Foundation Previews
import { ThemingPreview } from '@/components/previews/foundations/ThemingPreview';

const customComponents = {
    ...defaultMdxComponents,
    ComponentPreview,
    PropsTable,
    TokenGrid,
    ColorPalette,
    SpacingScale,
    TypographyScale,
    DecisionTree,
    DosAndDonts,
    KeyboardTable,
    InstallSnippet,
    // Component Previews
    ButtonPreview,
    BadgePreview,
    AlertPreview,
    CardPreview,
    LinkPreview,
    CodePreview,
    DividerPreview,
    HeadingPreview,
    TextPreview,
    LabelPreview,
    TextFieldPreview,
    TextAreaPreview,
    CheckboxPreview,
    RadioGroupPreview,
    SelectPreview,
    SwitchPreview,
    SliderPreview,
    TogglePreview,
    ToggleGroupPreview,
    ProgressPreview,
    SpinnerPreview,
    SkeletonPreview,
    ToastPreview,
    ContainerPreview,
    GridPreview,
    StackPreview,
    AspectRatioPreview,
    TablePreview,
    AccordionPreview,
    DialogPreview,
    DrawerPreview,
    PopoverPreview,
    TooltipPreview,
    TabsPreview,
    BreadcrumbPreview,
    PaginationPreview,
    FormPreview,
    IconButtonPreview,
    AvatarPreview,
    // Pattern Previews
    LoginFormPreview,
    SignupFormPreview,
    ForgotPasswordPreview,
    DashboardStatsPreview,
    EmptyStatePreview,
    ErrorPagePreview,
    SidebarNavPreview,
    NavbarPreview,
    ProfileSettingsPreview,
    NotificationSettingsPreview,
    AccountSettingsPreview,
    DashboardLayoutPreview,
    DataGridPlayground,
    // Foundation Previews
    ThemingPreview,
};

interface PageProps {
    params: Promise<{ slug?: string[] }>;
}

export default async function Page({
    params,
}: PageProps): Promise<React.ReactElement> {
    const { slug } = await params;
    const page = source.getPage(slug);

    if (!page) notFound();

    const MDX = page.data.body;

    return (
        <DocsPage toc={page.data.toc}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDX components={customComponents} />
            </DocsBody>
        </DocsPage>
    );
}

export function generateStaticParams(): { slug: string[] }[] {
    return source.generateParams();
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const page = source.getPage(slug);
    if (!page) return {};

    return {
        title: page.data.title,
        description: page.data.description,
    };
}
