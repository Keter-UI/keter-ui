import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents } from '../../mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdx');

export async function generateMetadata(props: { params: Promise<{ mdx: string[] }> }) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdx);
  return metadata;
}

export default async function Page(props: { params: Promise<{ mdx: string[] }> }) {
  const params = await props.params;
  const { default: MDXContent, toc, metadata } = await importPage(params.mdx);
  const components = useMDXComponents({});
  return <MDXContent toc={toc} components={components} />;
}
