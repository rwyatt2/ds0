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
import { InputPreview } from '@/components/previews/components/InputPreview';
import { TagPreview } from '@/components/previews/components/TagPreview';
import { AlertDialogPreview } from '@/components/previews/components/AlertDialogPreview';
import { DropdownMenuPreview } from '@/components/previews/components/DropdownMenuPreview';
import { ContextMenuPreview } from '@/components/previews/components/ContextMenuPreview';
import { CodeBlockPreview } from '@/components/previews/components/CodeBlockPreview';
import { CollapsiblePreview } from '@/components/previews/components/CollapsiblePreview';
import { ColorPickerPreview } from '@/components/previews/components/ColorPickerPreview';
import { ComboboxPreview } from '@/components/previews/components/ComboboxPreview';
import { CommandPalettePreview } from '@/components/previews/components/CommandPalettePreview';
import { CalendarPreview } from '@/components/previews/components/CalendarPreview';
import { BannerPreview } from '@/components/previews/components/BannerPreview';
import { NotificationPreview } from '@/components/previews/components/NotificationPreview';
import { RatingPreview } from '@/components/previews/components/RatingPreview';
import { StepperPreview } from '@/components/previews/components/StepperPreview';
import { StatusDotPreview } from '@/components/previews/components/StatusDotPreview';
import { CarouselPreview } from '@/components/previews/components/CarouselPreview';
import { ScrollAreaPreview } from '@/components/previews/components/ScrollAreaPreview';
import { SidebarPreview } from '@/components/previews/components/SidebarPreview';
import { TimelinePreview } from '@/components/previews/components/TimelinePreview';
import { EmptyStatePreview } from '@/components/previews/components/EmptyStatePreview';
import { StatCardPreview } from '@/components/previews/components/StatCardPreview';
import { SparklinePreview } from '@/components/previews/components/SparklinePreview';
import { FileUploadPreview } from '@/components/previews/components/FileUploadPreview';
import { DatePickerPreview } from '@/components/previews/components/DatePickerPreview';
import { NavigationMenuPreview } from '@/components/previews/components/NavigationMenuPreview';
import { MenubarPreview } from '@/components/previews/components/MenubarPreview';
import { DataTablePreview } from '@/components/previews/components/DataTablePreview';
import { DiffViewerPreview } from '@/components/previews/components/DiffViewerPreview';
import { JsonViewerPreview } from '@/components/previews/components/JsonViewerPreview';
import { PricingTablePreview } from '@/components/previews/components/PricingTablePreview';
import { ProductCardPreview } from '@/components/previews/components/ProductCardPreview';
import { CartPreview } from '@/components/previews/components/CartPreview';
import { ChangelogPreview } from '@/components/previews/components/ChangelogPreview';
import { ChartPreview } from '@/components/previews/components/ChartPreview';
import { ChatBubblePreview } from '@/components/previews/components/ChatBubblePreview';
import { TerminalPreview } from '@/components/previews/components/TerminalPreview';
import { HeatMapPreview } from '@/components/previews/components/HeatMapPreview';
import { KanbanBoardPreview } from '@/components/previews/components/KanbanBoardPreview';
import { RichTextPreview } from '@/components/previews/components/RichTextPreview';
import { TourPreview } from '@/components/previews/components/TourPreview';
import { TreeViewPreview } from '@/components/previews/components/TreeViewPreview';
import { AppShellPreview } from '@/components/previews/components/AppShellPreview';
import { AvatarGroupPreview } from '@/components/previews/components/AvatarGroupPreview';
import { BackToTopPreview } from '@/components/previews/components/BackToTopPreview';
import { ConfettiPreview } from '@/components/previews/components/ConfettiPreview';
import { CookieConsentPreview } from '@/components/previews/components/CookieConsentPreview';
import { CountdownTimerPreview } from '@/components/previews/components/CountdownTimerPreview';
import { DockPreview } from '@/components/previews/components/DockPreview';
import { ErrorBoundaryPreview } from '@/components/previews/components/ErrorBoundaryPreview';
import { InfiniteScrollPreview } from '@/components/previews/components/InfiniteScrollPreview';
import { MasonryGridPreview } from '@/components/previews/components/MasonryGridPreview';
import { SplitterPreview } from '@/components/previews/components/SplitterPreview';

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
import { ChartPlayground } from '@/components/previews/components/ChartPlayground';
import { CommandPalettePatternPreview } from '@/components/previews/patterns/CommandPalettePatternPreview';
import { DataTablePatternPreview } from '@/components/previews/patterns/DataTablePatternPreview';
import { DataDisplayPatternPreview } from '@/components/previews/patterns/DataDisplayPatternPreview';
import { FeedbackPatternPreview } from '@/components/previews/patterns/FeedbackPatternPreview';
import { FormsPatternPreview } from '@/components/previews/patterns/FormsPatternPreview';
import { NavigationPatternPreview } from '@/components/previews/patterns/NavigationPatternPreview';
import { PricingCardsPatternPreview } from '@/components/previews/patterns/PricingCardsPatternPreview';

// Foundation Previews
import { ThemingPreview } from '@/components/previews/foundations/ThemingPreview';
import { ColorsPreview } from '@/components/previews/foundations/ColorsPreview';
import { ElevationPreview } from '@/components/previews/foundations/ElevationPreview';
import { MotionPreview } from '@/components/previews/foundations/MotionPreview';
import { RadiusPreview } from '@/components/previews/foundations/RadiusPreview';
import { SpacingPreview } from '@/components/previews/foundations/SpacingPreview';
import { TokensPreview } from '@/components/previews/foundations/TokensPreview';
import { TypographyPreview } from '@/components/previews/foundations/TypographyPreview';

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
    InputPreview,
    TagPreview,
    AlertDialogPreview,
    DropdownMenuPreview,
    ContextMenuPreview,
    CodeBlockPreview,
    CollapsiblePreview,
    ColorPickerPreview,
    ComboboxPreview,
    CommandPalettePreview,
    CalendarPreview,
    BannerPreview,
    NotificationPreview,
    RatingPreview,
    StepperPreview,
    StatusDotPreview,
    CarouselPreview,
    ScrollAreaPreview,
    SidebarPreview,
    TimelinePreview,
    EmptyStatePreview,
    StatCardPreview,
    SparklinePreview,
    FileUploadPreview,
    DatePickerPreview,
    NavigationMenuPreview,
    MenubarPreview,
    DataTablePreview,
    DiffViewerPreview,
    JsonViewerPreview,
    PricingTablePreview,
    ProductCardPreview,
    CartPreview,
    ChangelogPreview,
    ChartPreview,
    ChatBubblePreview,
    TerminalPreview,
    HeatMapPreview,
    KanbanBoardPreview,
    RichTextPreview,
    TourPreview,
    TreeViewPreview,
    AppShellPreview,
    AvatarGroupPreview,
    BackToTopPreview,
    ConfettiPreview,
    CookieConsentPreview,
    CountdownTimerPreview,
    DockPreview,
    ErrorBoundaryPreview,
    InfiniteScrollPreview,
    MasonryGridPreview,
    SplitterPreview,
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
    ChartPlayground,
    CommandPalettePatternPreview,
    DataTablePatternPreview,
    DataDisplayPatternPreview,
    FeedbackPatternPreview,
    FormsPatternPreview,
    NavigationPatternPreview,
    PricingCardsPatternPreview,
    // Foundation Previews
    ThemingPreview,
    ColorsPreview,
    ElevationPreview,
    MotionPreview,
    RadiusPreview,
    SpacingPreview,
    TokensPreview,
    TypographyPreview,
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
