import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export const usePageContent = (slug: string) => {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('page_content')
                    .select('content')
                    .eq('section_slug', slug)
                    .single();

                if (error && error.code !== 'PGRST116') {
                    console.error(`Error fetching content for ${slug}:`, error);
                }

                if (data) {
                    setContent(data.content);
                }
            } catch (error) {
                console.error(`Error in usePageContent for ${slug}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [slug]);

    return { content, loading };
};
