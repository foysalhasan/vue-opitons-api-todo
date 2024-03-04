import { supabase } from '../lib/supabaseClient'

export const addBlogPost = async (post) => {
  console.log(post)
  const { data, error } = await supabase.from('blog').insert([post])
  console.log(error)
  return { data, error }
}
