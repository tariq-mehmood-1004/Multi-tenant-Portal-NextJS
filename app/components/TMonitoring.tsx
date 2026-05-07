import { Button, Tooltip } from '@heroui/react'
import { ArrowRight, Trash } from 'lucide-react'
import React from 'react'
import { MigrationJobResponse, useTenantStore } from '../store/useTenantStore'

const TMonitoring = ({ jobs }: { jobs: MigrationJobResponse[] }) => {

    const { 
        isMigrationJobDeleting,
        deleteMigrationJob
    } = useTenantStore();
    
  return (
      <div className="flex flex-col bg-blue-100/60 rounded-lg py-4 px-3 gap-4">

          <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-blue-600">Monitoring</h1>
              </div>


              <div className="w-full overflow-x-auto">

                  <table className="bg-white min-w-full overflow-hidden rounded-lg divide-y divide-gray-200">
                      <thead className='bg-zinc-200'>
                          <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                                  Job ID
                              </th>
                              <th scope="col" className="px-6 py-3 text-left flex items-center gap-1 text-xs font-bold text-black uppercase tracking-wider">
                                  <span>Source</span>
                                  <ArrowRight className="w-4 h-4 inline-block" />
                                  <span>Target</span>
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                                  Tables
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                                  Mode
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                                  Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                                  Action
                              </th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                          {jobs.map((job) => (
                              <tr key={job.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">{job.id}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                      <span>{job.sourcePlatform.platform}</span>
                                      <ArrowRight className="w-4 h-4 inline-block" />
                                      <span>{job.targetPlatform.platform}</span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-900">{job.tables.join(", ")}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      {job.mode === "full" ? "Full" : "Partial"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`
                                        border px-2 py-1 rounded
                                        ${job.status === "completed"
                                          ? "text-green-500 border-green-500 bg-green-100"
                                          : job.status === "failed" ? "text-red-500 border-red-500 bg-red-100"
                                              : job.status === "running" ? "text-blue-500 border-blue-500 bg-blue-100"
                                                  : "text-gray-500 border-gray-500 bg-gray-100"
                                            }
                                        `}>
                                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                      </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                      <Button isDisabled={isMigrationJobDeleting} onPress={() => deleteMigrationJob(job.id)} className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300">
                                          <Trash className="w-4 h-4" />
                                      </Button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  )
}

export default TMonitoring