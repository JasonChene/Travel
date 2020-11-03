<template>
  <div class="flow-container">
    <div ref="content" class="containers">
      <div ref="canvas" class="canvas" />
      <div id="js-properties-panel" class="panel" />
      <ul class="buttons">
        <li>
          <a ref="saveDiagram" href="javascript:"><i class="el-icon-download" />下载BPMN文件</a>
        </li>
        <li>
          <a ref="saveSvg" href="javascript:"><i class="el-icon-download" />下载SVG图片</a>
        </li>
        <li>
          <el-button type="primary" icon="el-icon-plus" @click="persistProcess">
            {{ $t('common.save') }}
          </el-button>
        </li>
        <li>
          <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
            {{ $t('common.return') }}
          </el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import translationCn from './customTranslate/customTranslate' // 汉化
import { getDesignProcessResource, persistProcess } from '@/api/activiti'
import qs from 'qs'

export default {
  name: 'ProcessDesign',
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      xmlStr: null,
      processName: '',
      temp: {}
    }
  },
  activated() {
    this.createNewDiagram()
  },
  mounted() {
    // 获取到属性ref为“content”的dom节点
    this.container = this.$refs.content
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas

    var translationCnModule = {
      translate: ['value', translationCn]
    }

    // 建模，官方文档这里讲的很详细
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      // 添加控制板
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        translationCnModule,
        // 左边工具栏以及节点
        propertiesProviderModule,
        // 右边的工具栏
        propertiesPanelModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    })

    // 下载画图
    const _this = this
    // 获取a标签dom节点
    const downloadLink = this.$refs.saveDiagram
    const downloadSvgLink = this.$refs.saveSvg
    // 给图绑定事件，当图有发生改变就会触发这个事件
    this.bpmnModeler.on('commandStack.changed', function() {
      _this.saveSVG(function(err, svg) {
        _this.setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg)
      })
      _this.saveDiagram(function(err, xml) {
        _this.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
      })
    })

    // this.createNewDiagram(this.bpmnModeler)
  },
  methods: {
    createNewDiagram() {
      // 删除 bpmn logo
      const bpmnjsLogo = document.querySelector('.bjs-powered-by')
      while (bpmnjsLogo.firstChild) {
        bpmnjsLogo.removeChild(bpmnjsLogo.firstChild)
      }
      if (this.$route.query.deploymentId) {
        getDesignProcessResource(this.$route.query.deploymentId).then(response => {
          if (response.message === 'success') {
            this.bpmnModeler.importXML(response.data, function(err) {
              if (err) {
                console.error(err)
              }
            })
          } else {
            this.handleWarning(response)
          }
        })
      } else {
        const bpmnXmlStr = `<?xml version="1.0" encoding="UTF-8"?>
        <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
          <bpmn2:process id="Process_1" isExecutable="true">
            <bpmn2:startEvent id="StartEvent_1"/>
          </bpmn2:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
              <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
                <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
              </bpmndi:BPMNShape>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        </bpmn2:definitions>`
        // 将字符串转换成图显示出来
        this.bpmnModeler.importXML(bpmnXmlStr, function(err) {
          if (err) {
            console.error(err)
          }
        })
      }
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG(done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.bpmnModeler.saveSVG(done)
    },
    // 下载为XML格式,done是个函数，调用的时候传入的
    saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml)
      })
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data)
      // 获取到图的xml，保存就是把这个xml提交给后台
      this.xmlStr = data
      // 下载图的具体操作
      if (data) {
        link.className = 'active'
        link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
        link.download = name
      }
    },
    persistProcess() {
      let json_xml = ''
      let svg_xml = ''
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (err) {
          console.error(err)
        }
        json_xml = xml
      })
      this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
        if (err) {
          console.error(err)
        }
        svg_xml = data
      })
      this.temp.modelId = this.$route.query.modelId
      this.temp.jsonXml = json_xml
      this.temp.svgXml = svg_xml
      persistProcess(qs.stringify(this.temp)).then(response => {
        if (response.message === 'success') {
          this.$message({
            message: this.$t('common.save-success'),
            type: 'success',
            duration: 2000
          })
        } else {
          this.handleWarning(response)
        }
      })
    },
    handleWarning(response) {
      this.$message({
        message: response.message || response,
        type: 'warning',
        duration: 2000
      })
    },
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/activiti/model' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  /*左边工具栏以及编辑节点的样式*/
  @import '~bpmn-js/dist/assets/diagram-js.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  .flow-container {
    display: flex;
  }
  /*右边工具栏样式*/
  @import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
  .containers {
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
  .canvas {
    width: 100%;
    height: 100%;
  }
  .panel {
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
    height: 100%;
    overflow-y: scroll;
  }
  .buttons {
    position: absolute;
    left: 20px;
    bottom: 10px;
    &>li {
      display: inline-block;
      margin: 5px;
      &>a {
        color: #999;
        border-radius: 4px;
        background: #eee;
        cursor: not-allowed;
        padding: 10px;
        border: 1px solid #ccc;
        &.active {
          color: #333;
          background: #fff;
          cursor: pointer;
        }
      }
    }
  }
  .pan-back-btn {
    background: #008489;
    color: #fff;
  }
</style>
