/**
 * @Author       : zuohy
 * @Date         : 2024-08-26 14:13:31
 * @LastEditTime : 2024-08-26 14:13:31
 * @LastEditors  : zuohy
 * @Description  : 
*/

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBlogSettingsDetail } from '@/api/frontend/blogsettings'

export const useBlogSettingsStore = defineStore('blogsettings', () => {
  const blogSettings = ref({})

  function getBlogSettings() {
    getBlogSettingsDetail().then(res => {
      if (res.success) {
        blogSettings.value = res.data
      }
    })
  }

  return { blogSettings, getBlogSettings }
})
