'use client';

import { useState } from 'react';
import Image from 'next/image';

interface WatchImageProps {
  src: string;
  alt: string;
  className?: string;
}

function WatchImage({ src, alt, className = '' }: WatchImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (imageError) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth="2"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
          </svg>
          <p className="text-gray-500 text-sm">图片加载失败</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setImageLoading(false)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}

// 手表产品数据
const watches = [
  {
    id: 1,
    name: '经典系列',
    model: 'Elegant Classic',
    price: '¥2,880',
    description: '精致简约的设计，适合商务场合',
    features: ['自动机械机芯', '不锈钢表壳', '蓝宝石水晶镜面', '防水50米'],
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 2,
    name: '运动系列',
    model: 'Sport Pro',
    price: '¥3,680',
    description: '专业运动手表，适合户外活动',
    features: ['石英机芯', '钛合金表壳', '强化矿物水晶镜面', '防水200米', '夜光指针'],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 3,
    name: '奢华系列',
    model: 'Luxury Gold',
    price: '¥12,800',
    description: '奢华黄金材质，彰显尊贵品味',
    features: ['瑞士ETA机芯', '18K黄金表壳', '钻石镶嵌', '蓝宝石水晶镜面', '防水30米'],
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587925358603-c2eea40a9e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export default function WatchShowcase() {
  const [selectedWatch, setSelectedWatch] = useState(watches[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">精选手表展示</h1>
              <p className="text-gray-600 mt-1">商务大厦1A - 精品手表专营</p>
            </div>
            <a
              href="/"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              返回大厦目录
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">欢迎来到精选手表展示厅</h2>
          <p className="text-gray-600">
            商务大厦1A精心挑选的优质手表系列，为您呈现卓越品质与精湛工艺
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">手表系列</h3>
              <div className="space-y-3">
                {watches.map(watch => (
                  <button
                    key={watch.id}
                    onClick={() => {
                      setSelectedWatch(watch);
                      setSelectedImageIndex(0);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedWatch.id === watch.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{watch.name}</div>
                    <div className="text-sm text-gray-600">{watch.model}</div>
                    <div className="text-lg font-bold text-blue-600 mt-1">{watch.price}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Main Image */}
              <div className="aspect-w-16 aspect-h-12 bg-gray-100 relative">
                <div className="w-full h-96 flex items-center justify-center p-4">
                  <WatchImage
                    src={selectedWatch.images[selectedImageIndex]}
                    alt={selectedWatch.name}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  {selectedWatch.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                        selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <WatchImage
                        src={image}
                        alt={`${selectedWatch.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedWatch.name}</h2>
                    <p className="text-gray-600">{selectedWatch.model}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{selectedWatch.price}</div>
                    <div className="text-sm text-gray-500">人民币</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{selectedWatch.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">产品特点</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedWatch.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    立即咨询
                  </button>
                  <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    预约试戴
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">关于我们</h3>
            <p className="text-gray-600">商务大厦1A - 精品手表专营店</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">正品保证</h4>
              <p className="text-gray-600">所有手表均来自正规渠道，提供权威证书</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">专业维修</h4>
              <p className="text-gray-600">提供专业的手表维修保养服务</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">咨询服务</h4>
              <p className="text-gray-600">专业的销售顾问为您提供一对一咨询服务</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">联系我们</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">营业时间</h4>
              <p className="text-gray-600">周一至周五: 9:00 - 18:00</p>
              <p className="text-gray-600">周六至周日: 10:00 - 17:00</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">联系方式</h4>
              <p className="text-gray-600">电话: 400-001-001</p>
              <p className="text-gray-600">邮箱: watch@business-tower.com</p>
              <p className="text-gray-600">地址: 商务大厦1A</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}