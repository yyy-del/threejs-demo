import { useDark, useToggle } from '@vueuse/core'
import { cpSync } from 'fs'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)



/**
 * 混合颜色
 */
const mix = (color1: string, color2: string, weight: number) => {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  const r1 = parseInt(color1.substring(1, 3), 16)
  const g1 = parseInt(color1.substring(3, 5), 16)
  const b1 = parseInt(color1.substring(5, 7), 16)
  const r2 = parseInt(color2.substring(1, 3), 16)
  const g2 = parseInt(color2.substring(3, 5), 16)
  const b2 = parseInt(color2.substring(5, 7), 16)
  const r = Math.round(r1 * (1 - weight) + r2 * weight)
  const g = Math.round(g1 * (1 - weight) + g2 * weight)
  const b = Math.round(b1 * (1 - weight) + b2 * weight)
  const _r = ('0' + (r || 0).toString(16)).slice(-2)
  const _g = ('0' + (g || 0).toString(16)).slice(-2)
  const _b = ('0' + (b || 0).toString(16)).slice(-2)
  return '#' + _r + _g + _b
}


/**
 * 
 * @param color 只接受16进制颜色格式
 */

export function setTheme(colorTypes:colorType ){
  console.log('change theme')
  console.log(colorTypes)
  // document.documentElement 是全局变量时
  const el = document.documentElement
  // const el = document.getElementById('xxx')
  
  // 设置 css 变量
   for (const key in colorTypes) {
     console.log(key)
    if (Object.prototype.hasOwnProperty.call(colorTypes, key)) {
      const type = key
      const color = colorTypes[type];
      console.log(color)

       // 获取 css 变量
       getComputedStyle(el).getPropertyValue(`--el-color-${type}`)
      el.style.setProperty(`--el-color-${type}`,color)
      
    // 循环设置次级颜色
    for (let i = 1; i < 10; i += 1) {
       el.style.setProperty(`--el-color-${type}-light-${i}`, mix(color, '#ffffff', i * 0.1))
    }
      
    }
   }



}


